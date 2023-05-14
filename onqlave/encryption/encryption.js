const { NewKeyManager, KeyManagerConfiguration } = require('../keymanager/keymanagerclient')
const { Credential } = require('../credentials/credential')
const { RetrySettings, INVALID_ARX } = require('../connection/client')
const { IDService } = require('../keymanager/services/idgenservice')
const { CPRNGService } = require('../keymanager/services/cprngservice')
const { NewAEADGCMKeyFactory } = require('../keymanager/factories/aesgcmfactory')
const { NewXChaCha20Poly1305KeyFactory } = require('../keymanager/factories/xchacha20poly1305factory')
const { NewAES128GCMKeyOperation } = require('../keymanager/operations/aes128gcmoperation')
const { NewAES256GCMKeyOperation } = require('../keymanager/operations/aes256gcmoperation')
const { NewXChaCha20Poly1305KeyOperation } = require('../keymanager/operations/xchacha20poly1305operation')
const { Algorithms } = require('../keymanager/types/types')
const { OnqlaveError, ErrorCodes } = require('../errors/errors')
const { performance } = require('perf_hooks')
const { Readable, Writable } = require('stream')
const { BufferWritable } = require('./bufferwritable')
const { BufferEncryptedStreamProcessor, EncryptedStreamProcessor } = require('./encryptedstreamprocessor')
const { PlainStreamProcessor } = require('./plainstreamprocessort')
const { AlgorithmSerialiser } = require('./algorithmserialiser')

class Encryption {
    constructor(...opts) {
        const options = new KeyManagerConfiguration(new Credential(), new RetrySettings(), INVALID_ARX)
        for (const o of opts) {
            o.apply(options)
        }
        this.logger = console
        const randomService = new CPRNGService()
        const idService = new IDService(randomService)
        const keyManager = NewKeyManager(options, randomService, idService)
        const aeadGcmKeyFactory = NewAEADGCMKeyFactory(idService, randomService)
        const xchchaKeyFactory = NewXChaCha20Poly1305KeyFactory(idService, randomService)

        const operations = {
            [Algorithms.Aesgcm128]: NewAES128GCMKeyOperation(aeadGcmKeyFactory),
            [Algorithms.Aesgcm256]: NewAES256GCMKeyOperation(aeadGcmKeyFactory),
            [Algorithms.XChacha20poly1305]: NewXChaCha20Poly1305KeyOperation(xchchaKeyFactory),
        }
        this.keyManager = keyManager
        this.operations = operations
    }

    close() {
        this.keyManager = null
    }

    async encryptStream(plainStream, cipherStream, associatedData) {
        const operation = "EncryptStream";
        const start = performance.now();
        this.logger.info(`Encrypting operation: ${operation}`);
        try {
            if (!(plainStream instanceof Readable)) {
                throw new Error("plainStream must be an instance of Readable");
            }
            if (!(cipherStream instanceof Writable)) {
                throw new Error("cipherStream must be an instance of Writable");
            }

            const { algorithm, primitive } = await this.initEncryptOperation(operation);
            const processor = new PlainStreamProcessor(cipherStream);
            await processor.writeHeader(algorithm);
            await this._readFromStream(plainStream, async (chunk) => {
                if (chunk) {
                    const cipherData = primitive.encrypt(chunk, associatedData);
                    await processor.writePacket(cipherData);
                } else {
                }
            });
            this.logger.info(`[onqlave] SDK: ${operation} - Encrypted plain data: operation took ${performance.now() - start} ms`)
        } catch (error) {
            throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error, `[onqlave] SDK: ${operation} - Faild encrypting plain data`);
        }
    }

    async decryptStream(cipherStream, plainStream, associatedData) {
        const operation = "DecryptStream";
        const start = performance.now();
        this.logger.info(`Decrypting operation: ${operation}`);
        try {
            if (!(plainStream instanceof Writable)) {
                throw new Error("plainStream must be an instance of Writable");
            }
            if (!(cipherStream instanceof Readable)) {
                throw new Error("cipherStream must be an instance of Readable");
            }
            const processor = new EncryptedStreamProcessor();
            const outProcessor = new PlainStreamProcessor(plainStream);
            let algo = null;
            let primitive = null;
            let plainData = null;
            await this._readFromStream(cipherStream, async (chunk) => {
                if (chunk) {
                    if (algo === null) {
                        algo = processor.readHeader(chunk);
                        primitive = await this.initDecryptOperation(operation, algo);
                    } else {
                        const cipher = processor.readPacket(chunk);
                        plainData = await primitive.decrypt(cipher, associatedData);
                        await outProcessor.writePlainPacket(plainData);
                    }
                } else {
                    const cipher = processor.readPacket(null);
                    plainData = await primitive.decrypt(cipher, associatedData);
                    await outProcessor.writePlainPacket(plainData);
                }
            });
            this.logger.info(`[onqlave] SDK: ${operation} - Decrypted cipher data: operation took ${performance.now() - start} ms`);
        } catch (error) {
            throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error, `[onqlave] SDK: ${operation} - Faild decrypting cipher data`);
        }
    }

    async encrypt(plainData, associatedData) {
        const operation = "Encrypt";
        const start = performance.now();
        this.logger.info(`Encrypting operation: ${operation}`);

        try {
            const { algorithm, primitive } = await this.initEncryptOperation(operation);
            const cipherData = primitive.encrypt(plainData, associatedData);
            const cipherStream = new BufferWritable()
            const processor = new PlainStreamProcessor(cipherStream);
            await processor.writeHeader(algorithm);
            await processor.writePacket(cipherData);
            this.logger.info(`[onqlave] SDK: ${operation} - Encrypted plain data: operation took ${performance.now() - start} ms`)
            return cipherStream.buffer();
        } catch (error) {
            throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error, `[onqlave] SDK: ${operation} - Faild encrypting plain data`);
        }
    }

    async decrypt(cipherData, associatedData) {
        const operation = "Decrypt";
        const start = performance.now();
        this.logger.info(`Decrypting operation: ${operation}`);

        try {
            const cipherStream = Readable.from(cipherData);
            const processor = new BufferEncryptedStreamProcessor(cipherStream);
            const algo = await processor.readHeader();
            const cipher = await processor.readPacket();
            const primitive = await this.initDecryptOperation(operation, algo);
            const plainData = primitive.decrypt(cipher, associatedData);
            this.logger.info(`[onqlave] SDK: ${operation} - Decrypted cipher data: operation took ${performance.now() - start} ms`)

            return plainData;
        } catch (error) {
            throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error, `[onqlave] SDK: ${operation} - Faild decrypting cipher data`);
        }
    }

    async initEncryptOperation(operation) {
        try {
            const { edk, dk, algo } = await this.keyManager.fetchEncryptionKey();
            const ops = this.operations[algo];
            if (!ops) {
                throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, null, `[onqlave] SDK: ${operation} - Invalid encryption operation`)
            }
            const factory = ops.getFactory();
            const key = await factory.newKeyFromData(ops, dk);
            const primitive = await factory.primitive(key);
            const algorithm = new AlgorithmSerialiser(0, algo, edk);
            return { algorithm, primitive };
        } catch (error) {
            throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error, `[onqlave] SDK: ${operation} - Faild encrypting plain data`)
        }
    }

    async initDecryptOperation(operation, algo) {
        try {
            const dk = await this.keyManager.fetchDecryptionKey(algo.getKey());
            const ops = this.operations[algo.getAlgorithm()];
            if (!ops) {
                throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, null, `[onqlave] SDK: ${operation} - Invalid encryption operation`)
            }
            const factory = ops.getFactory();
            const key = await factory.newKeyFromData(ops, dk);
            const primitive = await factory.primitive(key);

            return primitive;
        } catch (error) {
            throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error, `[onqlave] SDK: ${operation} - Faild encrypting plain data`)
        }
    }

    _readFromStream(readableStream, callback) {
        return new Promise((resolve, reject) => {
            readableStream.on('data', async (chunk) => {
                readableStream.pause();
                await callback(chunk);
                readableStream.resume();
            }).on('end', async () => {
                await callback(null);
                resolve(null);
            });
        });
    }
}

module.exports = { 
    Encryption,
    NewEncryption: (...opts) => {
        return new Encryption(opts);
    } 
};

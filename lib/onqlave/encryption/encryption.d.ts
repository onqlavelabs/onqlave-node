export class Encryption {
    constructor(...opts: any[]);
    logger: Console;
    keyManager: {
        keyManager: {
            client: {
                retrySettings: {
                    count: number;
                    waitTime: number;
                    maxWaitTime: number;
                    valid(): null;
                };
                logger: Console;
                post(resource: any, body: any, headers: any): Promise<any>;
            };
            hasher: any;
            logger: Console;
            configuration: any;
            post(resource: any, body: any): Promise<any>;
        };
        configuration: any;
        logger: Console;
        operations: {
            [x: string]: {
                factory: any;
                format: import("../keymanager/types/types").RsaSsaPkcs1KeyFormat;
                getFormat(): import("../keymanager/types/types").RsaSsaPkcs1KeyFormat;
                getFactory(): any;
            };
        };
        fetchEncryptionKey(): Promise<{
            edk: Buffer;
            dk: any;
            algo: any;
        }>;
        fetchDecryptionKey(edk: any): Promise<any>;
        unwrapKey(wrappingAlgorithm: any, operation: any, wdk: any, epk: any, fp: any, password: any): Promise<any>;
    };
    operations: {
        [x: string]: {
            factory: any;
            format: import("../keymanager/types/types").AesGcmKeyFormat;
            getFormat(): import("../keymanager/types/types").AesGcmKeyFormat;
            getFactory(): any;
        } | {
            factory: any;
            format: import("../keymanager/types/types").AesGcmKeyFormat;
            getFormat(): import("../keymanager/types/types").AesGcmKeyFormat;
            getFactory(): any;
        } | {
            factory: any;
            format: import("../keymanager/types/types").XChaChaKeyFormat;
            getFormat(): import("../keymanager/types/types").XChaChaKeyFormat;
            getFactory(): any;
        };
    };
    close(): void;
    encryptStream(plainStream: any, cipherStream: any, associatedData: any): Promise<void>;
    decryptStream(cipherStream: any, plainStream: any, associatedData: any): Promise<void>;
    /**
     *
     * @param plainData {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Promise<Uint8Array | Buffer>}
     */
    encrypt(plainData: Uint8Array | Buffer, associatedData: Uint8Array | Buffer): Promise<Uint8Array | Buffer>;
    /**
     *
     * @param cipherData {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Promise<Uint8Array | Buffer>}
     */
    decrypt(cipherData: Uint8Array | Buffer, associatedData: Uint8Array | Buffer): Promise<Uint8Array | Buffer>;
    initEncryptOperation(operation: any): Promise<{
        algorithm: AlgorithmSerialiser;
        primitive: any;
    }>;
    initDecryptOperation(operation: any, algo: any): Promise<any>;
    _readFromStream(readableStream: any, callback: any): Promise<any>;
}
import { AlgorithmSerialiser } from "./algorithmserialiser";
export declare function NewEncryption(...opts: any[]): Encryption;

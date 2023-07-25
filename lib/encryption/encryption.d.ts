/**
 * @class
 */
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
            dk: string | Uint8Array | Buffer;
            algo: any;
        }>;
        fetchDecryptionKey(edk: Uint8Array): Promise<Uint8Array>;
        unwrapKey(wrappingAlgorithm: string, operation: string, wdk: Uint8Array | Buffer, epk: Uint8Array | Buffer, fp: Uint8Array | Buffer, password: Uint8Array | Buffer): Promise<string | Uint8Array | Buffer>;
    };
    operations: {
        [x: string]: KeyOperation;
    };
    close(): void;
    /**
     *
     * @param cipherStream {Readable}
     * @param plainStream {Writable}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Promise<void>}
     */
    encryptStream(plainStream: Writable, cipherStream: Readable, associatedData: Uint8Array | Buffer): Promise<void>;
    /**
     *
     * @param cipherStream {Writable}
     * @param plainStream {Readable}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Promise<void>}
     */
    decryptStream(cipherStream: Writable, plainStream: Readable, associatedData: Uint8Array | Buffer): Promise<void>;
    /**
     *
     * @param plainData {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Promise<{Uint8Array | Buffer}>}
     */
    encrypt(plainData: Uint8Array | Buffer, associatedData: Uint8Array | Buffer): Promise<{}>;
    /**
     *
     * @param cipherData {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Promise<{Uint8Array | Buffer}>}
     */
    decrypt(cipherData: Uint8Array | Buffer, associatedData: Uint8Array | Buffer): Promise<{}>;
    initEncryptOperation(operation: any): Promise<{
        algorithm: AlgorithmSerialiser;
        primitive: any;
    }>;
    initDecryptOperation(operation: any, algo: any): Promise<any>;
    _readFromStream(readableStream: any, callback: any): Promise<any>;
}
import { Writable } from "stream";
import { Readable } from "stream";
import { AlgorithmSerialiser } from "./algorithmserialiser";
export declare function NewEncryption(...opts: any[]): Encryption;

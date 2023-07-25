export type Bytes = import('node-forge').Bytes;
export class KeyManagerConfiguration {
    constructor(credential: any, retry: any, arxUrl: any);
    arxURL: any;
    credential: any;
    retry: any;
}
/**
 * @class
 * @implements {KeyManagerClient}
 * @typedef {import('node-forge').Bytes} Bytes
 */
export class KeyManager implements KeyManagerClient {
    constructor(configuration: any, randomService: any);
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
            format: import("./types/types").RsaSsaPkcs1KeyFormat;
            getFormat(): import("./types/types").RsaSsaPkcs1KeyFormat;
            getFactory(): any;
        };
    };
    fetchEncryptionKey(): Promise<{
        edk: Buffer;
        dk: string | Uint8Array | Buffer;
        algo: any;
    }>;
    /**
     *
     * @param edk {Uint8Array}
     * @returns {Promise<Uint8Array>}
     */
    fetchDecryptionKey(edk: Uint8Array): Promise<Uint8Array>;
    /**
     * @param wrappingAlgorithm {string}
     * @param operation {string}
     * @param wdk {Uint8Array | Buffer}
     * @param epk {Uint8Array | Buffer}
     * @param fp {Uint8Array | Buffer}
     * @param password {Uint8Array | Buffer}
     * @returns {Promise<Uint8Array | Buffer | Bytes>}
     */
    unwrapKey(wrappingAlgorithm: string, operation: string, wdk: Uint8Array | Buffer, epk: Uint8Array | Buffer, fp: Uint8Array | Buffer, password: Uint8Array | Buffer): Promise<Uint8Array | Buffer | Bytes>;
}
import { KeyManagerClient } from "./types/types";
export declare function NewKeyManager(configuration: any, randomService: any): KeyManager;

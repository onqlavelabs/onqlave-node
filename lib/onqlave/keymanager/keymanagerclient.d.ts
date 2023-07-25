export class KeyManagerConfiguration {
    constructor(credential: any, retry: any, arxUrl: any);
    arxURL: any;
    credential: any;
    retry: any;
}
export class KeyManager extends KeyManagerClient {
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
        dk: any;
        algo: any;
    }>;
    fetchDecryptionKey(edk: any): Promise<any>;
    unwrapKey(wrappingAlgorithm: any, operation: any, wdk: any, epk: any, fp: any, password: any): Promise<any>;
}
import { KeyManagerClient } from "./types/types";
export declare function NewKeyManager(configuration: any, randomService: any): KeyManager;

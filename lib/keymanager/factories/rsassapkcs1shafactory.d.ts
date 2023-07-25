/**
 * @class
 * @implements {WrappingKeyFactory}
 */
export class RSASSAPKCS1SHAKeyFactory extends WrappingKeyFactory implements WrappingKeyFactory {
    /**
     *
     * @param randomService {CPRNGService}
     */
    constructor(randomService: CPRNGService);
    randomService: CPRNGService;
    primitive(operation: any): Promise<{
        hashFunc: any;
        randomService: any;
        hashID: any;
        unwrapKey(wdk: Uint8Array, epk: Uint8Array, fp: Uint8Array, password: Uint8Array): string | Uint8Array | Buffer;
    }>;
    /**
     *
     * @param hashAlg {string}
     * @returns {Promise<string|undefined>}
     */
    hashID(hashAlg: string): Promise<string | undefined>;
    rsaHashFunc(hashAlg: any): () => any;
    /**
     *
     * @param hashAlg {string}
     * @returns {boolean}
     */
    hashSafeForSignature(hashAlg: string): boolean;
}
import { WrappingKeyFactory } from "../types/types";
import { CPRNGService } from "../services/cprngservice";
export declare function NewRSASSAPKCS1SHAKeyFactory(randomService: any): RSASSAPKCS1SHAKeyFactory;

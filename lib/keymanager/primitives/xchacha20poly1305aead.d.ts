/**
 * @class
 * @implements {AEAD}
 */
export class XChaCha20Poly1305AEAD implements AEAD {
    /**
     *
     * @param key {any}
     * @param randomService {CPRNGService}
     */
    constructor(key: any, randomService: CPRNGService);
    key: any;
    randomService: CPRNGService;
    /**
     *
     * @param sizeInBytes {number}
     */
    validateXChaChaKeySize(sizeInBytes: number): void;
    /**
     *
     * @param plaintext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    encrypt(plaintext: Uint8Array | Buffer, associatedData: Uint8Array | Buffer): Uint8Array | Buffer;
    /**
     *
     * @param ciphertext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    decrypt(ciphertext: Uint8Array | Buffer, associatedData: Uint8Array | Buffer): Uint8Array | Buffer;
}
import { AEAD } from "../types/types";
import { CPRNGService } from "../services/cprngservice";
export declare function NewXChaCha20Poly1305AEAD(key: any, randomService: any): XChaCha20Poly1305AEAD;

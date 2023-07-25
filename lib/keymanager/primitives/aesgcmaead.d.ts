export type ByteStringBuffer = import('node-forge').util.ByteStringBuffer;
/**
 * @class
 * @implements {AEAD}
 * @typedef {import('node-forge').util.ByteStringBuffer} ByteStringBuffer
 */
export class AESGCMAEAD implements AEAD {
    /**
     *
     * @param key {any}
     * @param randomService {CPRNGService}
     */
    constructor(key: any, randomService: CPRNGService);
    randomService: CPRNGService;
    key: any;
    prependIV: boolean;
    validateAESKeySize(sizeInBytes: any): null;
    /**
     *
     * @param plaintext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    encrypt(plaintext: Uint8Array | Buffer, associatedData: Uint8Array | Buffer): Uint8Array | Buffer;
    /**
     *
     * @param ciphertext {Uint8Array | Buffer | ByteStringBuffer}
     * @param associatedData {Uint8Array | Buffer | ByteStringBuffer}
     * @returns {Uint8Array | Buffer}
     */
    decrypt(ciphertext: Uint8Array | Buffer | ByteStringBuffer, associatedData: Uint8Array | Buffer | ByteStringBuffer): Uint8Array | Buffer;
}
/**
 *
 * @type {number}
 */
export const AESGCMIVSize: number;
/**
 *
 * @type {number}
 */
export const AESGCMTagSize: number;
import { AEAD } from "../types/types";
import { CPRNGService } from "../services/cprngservice";
export declare function NewAESGCMAEAD(key: any, randomService: any): AESGCMAEAD;

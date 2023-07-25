export class XChaCha20Poly1305AEAD extends AEAD {
    constructor(key: any, randomService: any);
    key: any;
    randomService: any;
    validateXChaChaKeySize(sizeInBytes: any): void;
    encrypt(plaintext: any, associatedData: any): Buffer;
    decrypt(ciphertext: any, associatedData: any): Uint8Array;
}
import { AEAD } from "../types/types";
export declare function NewXChaCha20Poly1305AEAD(key: any, randomService: any): XChaCha20Poly1305AEAD;

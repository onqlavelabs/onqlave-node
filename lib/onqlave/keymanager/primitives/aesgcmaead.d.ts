export class AESGCMAEAD extends AEAD {
    constructor(key: any, randomService: any);
    randomService: any;
    key: any;
    prependIV: boolean;
    validateAESKeySize(sizeInBytes: any): null;
    encrypt(plaintext: any, associatedData: any): Buffer;
    decrypt(ciphertext: any, associatedData: any): Buffer;
}
export const AESGCMIVSize: 12;
export const AESGCMTagSize: 16;
import { AEAD } from "../types/types";
export declare function NewAESGCMAEAD(key: any, randomService: any): AESGCMAEAD;

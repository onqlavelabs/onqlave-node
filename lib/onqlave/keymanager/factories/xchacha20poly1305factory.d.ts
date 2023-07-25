export class XChaCha20Poly1305KeyFactory extends KeyFactory {
    constructor(idService: any, randomService: any);
    idService: any;
    randomService: any;
    newKey(operation: any): Promise<{
        keyID: any;
        operation: any;
        data: any;
        getKeyID(): any;
        getOperation(): any;
        getData(): any;
    }>;
    newKeyFromData(operation: any, keyData: any): {
        keyID: any;
        operation: any;
        data: any;
        getKeyID(): any;
        getOperation(): any;
        getData(): any;
    };
    primitive(key: any): Promise<{
        key: any;
        randomService: any;
        validateXChaChaKeySize(sizeInBytes: any): void;
        encrypt(plaintext: any, associatedData: any): Buffer;
        decrypt(ciphertext: any, associatedData: any): Uint8Array;
    }>;
    validateKey(key: any): any;
    validateKeyFormat(format: any): void;
    validateKeyVersion(version: any, maxExpected: any): void;
}
import { KeyFactory } from "../types/types";
export declare function NewXChaCha20Poly1305KeyFactory(idService: any, randomService: any): XChaCha20Poly1305KeyFactory;

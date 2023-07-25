export class AesGcmKeyFactory extends KeyFactory {
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
    newKeyFromData(operation: any, keyData: any): Promise<{
        keyID: any;
        operation: any;
        data: any;
        getKeyID(): any;
        getOperation(): any;
        getData(): any;
    }>;
    primitive(key: any): Promise<{
        randomService: any;
        key: any;
        prependIV: boolean;
        validateAESKeySize(sizeInBytes: any): null;
        encrypt(plaintext: any, associatedData: any): Buffer;
        decrypt(ciphertext: any, associatedData: any): Buffer;
    }>;
    validateKey(key: any): any;
    validateKeyVersion(version: any, maxExpected: any): void;
    validateKeyFormat(format: any): void;
}
import { KeyFactory } from "../types/types";
export declare function NewAEADGCMKeyFactory(idService: any, randomService: any): AesGcmKeyFactory;

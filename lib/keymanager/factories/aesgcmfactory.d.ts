/**
 * @class
 * @implements {KeyFactory}
 */
export class AesGcmKeyFactory implements KeyFactory {
    /**
     *
     * @param idService {IDService}
     * @param randomService {CPRNGService}
     */
    constructor(idService: IDService, randomService: CPRNGService);
    idService: IDService;
    randomService: CPRNGService;
    /**
     *
     * @param operation {KeyOperation}
     * @returns {Key}
     */
    newKey(operation: KeyOperation): Key;
    /**
     *
     * @param operation {KeyOperation}
     * @param keyData {Uint8Array | Buffer}
     * @returns {Key}
     */
    newKeyFromData(operation: KeyOperation, keyData: Uint8Array | Buffer): Key;
    /**
     *
     * @param key {Key}
     * @returns {AEAD}
     */
    primitive(key: Key): AEAD;
    validateKey(key: any): any;
    validateKeyVersion(version: any, maxExpected: any): void;
    validateKeyFormat(format: any): void;
}
import { KeyFactory } from "../types/types";
import { IDService } from "../services/idgenservice";
import { CPRNGService } from "../services/cprngservice";
import { KeyOperation } from "../types/types";
import { Key } from "../types/types";
import { AEAD } from "../types/types";
export declare function NewAEADGCMKeyFactory(idService: any, randomService: any): AesGcmKeyFactory;

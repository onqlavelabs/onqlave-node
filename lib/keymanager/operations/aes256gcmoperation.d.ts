/**
 * @class
 * @implements {KeyOperation}
 */
export class Aes256GcmKeyOperation implements KeyOperation {
    /**
     *
     * @param factory {KeyFactory}
     */
    constructor(factory: KeyFactory);
    factory: KeyFactory;
    format: AesGcmKeyFormat;
    /**
     *
     * @returns {KeyFormat}
     */
    getFormat(): KeyFormat;
    /**
     *
     * @returns {KeyFactory}
     */
    getFactory(): KeyFactory;
}
import { KeyOperation } from "../types/types";
import { KeyFactory } from "../types/types";
import { AesGcmKeyFormat } from "../types/types";
import { KeyFormat } from "../types/types";
export declare function NewAES256GCMKeyOperation(factory: any): Aes256GcmKeyOperation;

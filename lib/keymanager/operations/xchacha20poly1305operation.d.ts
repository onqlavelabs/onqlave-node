/**
 * @class
 * @implements {KeyOperation}
 */
export class XChaCha20Poly1305KeyOperation implements KeyOperation {
    constructor(factory: any);
    factory: any;
    format: XChaChaKeyFormat;
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
import { XChaChaKeyFormat } from "../types/types";
import { KeyFormat } from "../types/types";
import { KeyFactory } from "../types/types";
export declare function NewXChaCha20Poly1305KeyOperation(factory: any): XChaCha20Poly1305KeyOperation;

export class XChaCha20Poly1305KeyOperation extends KeyOperation {
    constructor(factory: any);
    factory: any;
    format: XChaChaKeyFormat;
    getFormat(): XChaChaKeyFormat;
    getFactory(): any;
}
import { KeyOperation } from "../types/types";
import { XChaChaKeyFormat } from "../types/types";
export declare function NewXChaCha20Poly1305KeyOperation(factory: any): XChaCha20Poly1305KeyOperation;

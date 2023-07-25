export class Aes256GcmKeyOperation extends KeyOperation {
    constructor(factory: any);
    factory: any;
    format: AesGcmKeyFormat;
    getFormat(): AesGcmKeyFormat;
    getFactory(): any;
}
import { KeyOperation } from "../types/types";
import { AesGcmKeyFormat } from "../types/types";
export declare function NewAES256GCMKeyOperation(factory: any): Aes256GcmKeyOperation;

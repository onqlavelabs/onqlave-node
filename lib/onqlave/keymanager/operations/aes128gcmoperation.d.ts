export class Aes128GcmKeyOperation extends KeyOperation {
    constructor(factory: any);
    factory: any;
    format: AesGcmKeyFormat;
    getFormat(): AesGcmKeyFormat;
    getFactory(): any;
}
import { KeyOperation } from "../types/types";
import { AesGcmKeyFormat } from "../types/types";
export declare function NewAES128GCMKeyOperation(factory: any): Aes128GcmKeyOperation;

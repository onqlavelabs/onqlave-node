export class RSASSAPKCS1SHA2562048KeyOperation extends WrappingKeyOperation {
    constructor(factory: any);
    factory: any;
    format: RsaSsaPkcs1KeyFormat;
    getFormat(): RsaSsaPkcs1KeyFormat;
    getFactory(): any;
}
import { WrappingKeyOperation } from "../types/types";
import { RsaSsaPkcs1KeyFormat } from "../types/types";
export declare function NewRSASSAPKCS1SHA2562048KeyOperation(factory: any): RSASSAPKCS1SHA2562048KeyOperation;

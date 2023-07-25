export class AesGcmKey extends Key {
    constructor(keyID: any, operation: any, data: any);
    keyID: any;
    operation: any;
    data: any;
    getKeyID(): any;
    getOperation(): any;
    getData(): any;
}
export class AesGcmKeyData extends KeyData {
    constructor(value: any, keyMaterialType: any, version: any);
    value: any;
    keyMaterialType: any;
    version: any;
    fromValue(): null;
    getValue(): any;
    getKeyMaterialType(): any;
    getVersion(): any;
}
import { Key } from "../types/types";
import { KeyData } from "../types/types";
export declare function NewAesGcmKey(id: any, operation: any, data: any): AesGcmKey;

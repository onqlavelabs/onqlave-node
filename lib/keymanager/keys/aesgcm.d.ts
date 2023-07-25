/**
 * @class
 * @implements {Key}
 */
export class AesGcmKey implements Key {
    /**
     *
     * @param keyID {number}
     * @param operation {KeyOperation}
     * @param data {AesGcmKeyData}
     */
    constructor(keyID: number, operation: KeyOperation, data: AesGcmKeyData);
    keyID: number;
    operation: KeyOperation;
    data: AesGcmKeyData;
    /**
     *
     * @returns {number}
     */
    getKeyID(): number;
    /**
     *
     * @returns {KeyOperation}
     */
    getOperation(): KeyOperation;
    /**
     *
     * @returns {KeyData}
     */
    getData(): KeyData;
}
/**
 * @class
 * @implements {KeyData}
 */
export class AesGcmKeyData implements KeyData {
    constructor(value: any, keyMaterialType: any, version: any);
    value: any;
    keyMaterialType: any;
    version: any;
    fromValue(): null;
    /**
     *
     * @returns {Uint8Array | Buffer}
     */
    getValue(): Uint8Array | Buffer;
    getKeyMaterialType(): any;
    /**
     *
     * @returns {number}
     */
    getVersion(): number;
}
import { Key } from "../types/types";
import { KeyOperation } from "../types/types";
import { KeyData } from "../types/types";
export declare function NewAesGcmKey(id: any, operation: any, data: any): AesGcmKey;

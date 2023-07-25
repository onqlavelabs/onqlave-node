export type Bytes = import('node-forge').Bytes;
/**
 * @class
 * @implements {Unwrapping}
 * @typedef {import('node-forge').Bytes} Bytes
 */
export class RSASSAPKCS1SHA implements Unwrapping {
    constructor(hashFunc: any, hashID: any, randomService: any);
    hashFunc: any;
    randomService: any;
    hashID: any;
    /**
     *
     * @param wdk {Uint8Array}
     * @param epk {Uint8Array}
     * @param fp {Uint8Array}
     * @param password {Uint8Array}
     * @returns {Uint8Array | Buffer | Bytes}
     *
     */
    unwrapKey(wdk: Uint8Array, epk: Uint8Array, fp: Uint8Array, password: Uint8Array): Uint8Array | Buffer | Bytes;
}
import { Unwrapping } from "../types/types";
export declare function NewRSASSAPKCS1SHA(hashFunc: any, hashID: any, randomService: any): RSASSAPKCS1SHA;

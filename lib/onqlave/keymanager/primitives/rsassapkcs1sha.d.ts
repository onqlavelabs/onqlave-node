export class RSASSAPKCS1SHA extends Unwrapping {
    constructor(hashFunc: any, hashID: any, randomService: any);
    hashFunc: any;
    randomService: any;
    hashID: any;
    unwrapKey(wdk: any, epk: any, fp: any, password: any): string;
}
import { Unwrapping } from "../types/types";
export declare function NewRSASSAPKCS1SHA(hashFunc: any, hashID: any, randomService: any): RSASSAPKCS1SHA;

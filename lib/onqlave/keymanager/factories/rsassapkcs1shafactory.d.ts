export class RSASSAPKCS1SHAKeyFactory extends WrappingKeyFactory {
    constructor(randomService: any);
    randomService: any;
    primitive(operation: any): Promise<{
        hashFunc: any;
        randomService: any;
        hashID: any;
        unwrapKey(wdk: any, epk: any, fp: any, password: any): string;
    }>;
    hashID(hashAlg: any): Promise<"sha256" | "sha384" | "sha512" | undefined>;
    rsaHashFunc(hashAlg: any): () => any;
    hashSafeForSignature(hashAlg: any): boolean;
}
import { WrappingKeyFactory } from "../types/types";
export declare function NewRSASSAPKCS1SHAKeyFactory(randomService: any): RSASSAPKCS1SHAKeyFactory;

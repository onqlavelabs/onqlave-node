export class TypeResolver {
    serialise(name: any, input: any): void;
    deserialise(name: any, input: any): void;
}
export class OnqlaveStructure {
    embeded: {};
    edk: any[];
}
export class WrappingKeyFactory {
    primitive(operation: any): void;
}
export class KeyFactory {
    newKey(operation: any): void;
    newKeyFromData(operation: any, keyData: any): void;
    primitive(key: any): void;
}
export class WrappingKeyOperation {
    getFormat(): void;
    getFactory(): void;
}
export class KeyOperation {
    getFormat(): void;
    getFactory(): void;
}
export class KeyFormat {
    size(): void;
}
export class AEAD {
    encrypt(plaintext: any, associatedData: any): void;
    decrypt(ciphertext: any, associatedData: any): void;
}
export class Unwrapping {
    unwrapKey(wdk: any, epk: any, fp: any, password: any): void;
}
export class KeyID {
}
export class AlgorithmSerializer {
    serialise(): void;
}
export class AlgorithmDeserializer {
    deserialise(buffer: any): void;
    key(): void;
    version(): void;
    algorithm(): void;
}
export class KeyData {
    getValue(): void;
    fromValue(data: any): void;
    getKeyMaterialType(): void;
    getVersion(): void;
}
export class Key {
    getKeyID(): void;
    getOperation(): void;
    getData(): void;
}
export const AlgorithmType: {
    unknown_algorithm: number;
    "aes-gcm-128": number;
    "aes-gcm-256": number;
    "xcha-cha-20-poly-1305": number;
};
export namespace HashType {
    let UNKNOWN_HASH: number;
    let SHA1: number;
    let SHA384: number;
    let SHA256: number;
    let SHA512: number;
    let SHA224: number;
}
export const HashTypeName: string[];
export namespace KeyMaterialType {
    let UNKNOWN_KEYMATERIAL: number;
    let SYMMETRIC: number;
    let ASYMMETRIC_PRIVATE: number;
    let ASYMMETRIC_PUBLIC: number;
    let REMOTE: number;
}
export const AESGCMKeyVersion: 0;
export const RSASSAPKCS1KeyVersion: 0;
export const XchaCha20Poly1305KeyVersion: 0;
export const AlgorithmNames: {
    0: string;
    1: string;
    2: string;
    3: string;
};
export namespace Algorithms {
    let Unknown: string;
    let Aesgcm128: string;
    let Aesgcm256: string;
    let XChacha20poly1305: string;
    let RsaSsapkcs12048sha256f4: string;
}
export class AesGcmKeyFormat extends KeyFormat {
    constructor(size: any, version: any);
    keySize: any;
    version: any;
    size(): any;
}
export class RsaSsaPkcs1KeyFormat extends KeyFormat {
    constructor(version: any, hash: any);
    version: any;
    hash: any;
    size(): number;
}
export class XChaChaKeyFormat extends KeyFormat {
    constructor(size: any, version: any);
    keySize: any;
    version: any;
    size(): any;
}
export class KeyManagerClient {
    fetchEncryptionKey(): void;
    fetchDecryptionKey(edk: any): void;
}

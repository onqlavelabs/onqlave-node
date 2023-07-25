export type Bytes = import('node-forge').Bytes;
/**
 * @interface
 */
export class OnqlaveStructure {
    embeded: {};
    edk: any[];
}
/**
 * @interface
 */
export class WrappingKeyFactory {
    /**
     *
     * @param operation {WrappingKeyOperation}
     * @returns {Promise<Unwrapping>}
     */
    primitive(operation: WrappingKeyOperation): Promise<Unwrapping>;
}
/**
 * @interface
 */
export class KeyFactory {
    /**
     *
     * @param operation {KeyOperation}
     * @returns {Key}
     */
    newKey(operation: KeyOperation): Key;
    /**
     *
     * @param operation {KeyOperation}
     * @param keyData {Uint8Array | Buffer}
     * @returns {Key}
     */
    newKeyFromData(operation: KeyOperation, keyData: Uint8Array | Buffer): Key;
    /**
     *
     * @param key {Key}
     * @returns {AEAD}
     */
    primitive(key: Key): AEAD;
}
/**
 * @interface
 */
export class WrappingKeyOperation {
    getFormat(): void;
    getFactory(): void;
}
/**
 * @interface
 */
export class KeyOperation {
    /**
     *
     * @returns {KeyFormat}
     */
    getFormat(): KeyFormat;
    /**
     *
     * @returns {KeyFactory}
     */
    getFactory(): KeyFactory;
}
/**
 * @interface
 */
export class KeyFormat {
    size(): void;
}
/**
 * @interface
 */
export class AEAD {
    /**
     *
     * @param plaintext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    encrypt(plaintext: Uint8Array | Buffer, associatedData: Uint8Array | Buffer): Uint8Array | Buffer;
    /**
     *
     * @param ciphertext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    decrypt(ciphertext: Uint8Array | Buffer, associatedData: Uint8Array | Buffer): Uint8Array | Buffer;
}
/**
 * @interface
 */
export class Unwrapping {
    /**
     * @param wdk {Uint8Array}
     * @param epk {Uint8Array}
     * @param fp {Uint8Array}
     * @param password {Uint8Array}
     * @returns {Uint8Array | Buffer | Bytes}
     *
     */
    unwrapKey(wdk: Uint8Array, epk: Uint8Array, fp: Uint8Array, password: Uint8Array): Uint8Array | Buffer | Bytes;
}
/**
 * @interface
 */
export class KeyID {
}
/**
 * @interface
 */
export class AlgorithmSerializer {
    serialise(): void;
}
/**
 * @interface
 */
export class AlgorithmDeserializer {
    deserialise(buffer: any): void;
    key(): void;
    version(): void;
    algorithm(): void;
}
/**
 * @interface
 */
export class KeyData {
    getValue(): void;
    fromValue(data: any): void;
    getKeyMaterialType(): void;
    getVersion(): void;
}
/**
 * @interface
 */
export class Key {
    getKeyID(): void;
    getOperation(): void;
    getData(): void;
}
export type AlgorithmType = number;
/**
 *
 * @enum {number}
 */
export const AlgorithmType: {
    unknown_algorithm: number;
    "aes-gcm-128": number;
    "aes-gcm-256": number;
    "xcha-cha-20-poly-1305": number;
};
export type HashType = number;
export namespace HashType {
    let UNKNOWN_HASH: number;
    let SHA1: number;
    let SHA384: number;
    let SHA256: number;
    let SHA512: number;
    let SHA224: number;
}
export const HashTypeName: string[];
export type KeyMaterialType = number;
export namespace KeyMaterialType {
    let UNKNOWN_KEYMATERIAL: number;
    let SYMMETRIC: number;
    let ASYMMETRIC_PRIVATE: number;
    let ASYMMETRIC_PUBLIC: number;
    let REMOTE: number;
}
/**
 *
 * @type {number}
 */
export const AESGCMKeyVersion: number;
/**
 *
 * @type {number}
 */
export const RSASSAPKCS1KeyVersion: number;
/**
 *
 * @type {number}
 */
export const XchaCha20Poly1305KeyVersion: number;
export type AlgorithmNames = string;
/**
 *
 * @enum {string}
 */
export const AlgorithmNames: {
    0: string;
    1: string;
    2: string;
    3: string;
};
export type Algorithms = string;
export namespace Algorithms {
    let Unknown: string;
    let Aesgcm128: string;
    let Aesgcm256: string;
    let XChacha20poly1305: string;
    let RsaSsapkcs12048sha256f4: string;
}
/**
 * @class
 * @implements {KeyFormat}
 */
export class AesGcmKeyFormat implements KeyFormat {
    /**
     *
     * @param size {number}
     * @param version {number}
     */
    constructor(size: number, version: number);
    /**
     *
     * @type {number}
     */
    keySize: number;
    /**
     *
     * @type {number}
     */
    version: number;
    /**
     *
     * @returns {number}
     */
    size(): number;
}
/**
 * @class
 * @implements {KeyFormat}
 */
export class RsaSsaPkcs1KeyFormat implements KeyFormat {
    /**
     *
     * @param version {number}
     * @param hashType {HashType}
     */
    constructor(version: number, hashType: HashType);
    /**
     *
     * @type {number}
     */
    version: number;
    /**
     *
     * @type {HashType}
     */
    hash: HashType;
    /**
     *
     * @returns {number}
     */
    size(): number;
}
/**
 * @class
 * @implements {KeyFormat}
 */
export class XChaChaKeyFormat implements KeyFormat {
    /**
     *
     * @param size {number}
     * @param version {number}
     */
    constructor(size: number, version: number);
    /**
     *
     * @type {number}
     */
    keySize: number;
    /**
     *
     * @type {number}
     */
    version: number;
    /**
     *
     * @returns {number}
     */
    size(): number;
}
/**
 * @interface
 * @typedef {import('node-forge').Bytes} Bytes
 */
export class KeyManagerClient {
    fetchEncryptionKey(): void;
    /**
     *
     * @param edk {Uint8Array}
     * @returns {Promise<Uint8Array | Buffer | Bytes>}
     */
    fetchDecryptionKey(edk: Uint8Array): Promise<Uint8Array | Buffer | Bytes>;
}

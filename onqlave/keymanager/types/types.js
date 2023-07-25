/**
 * @interface
 * @typedef {import('node-forge').Bytes} Bytes
 */
class KeyManagerClient {
    fetchEncryptionKey() {
        //
    }

    /**
     *
     * @param edk {Uint8Array}
     * @returns {Promise<Uint8Array | Buffer | Bytes>}
     */
    fetchDecryptionKey(edk) {
        //
    }
}

/**
 * @interface
 */
class OnqlaveStructure {
    constructor() {
        this.embeded = {};
        this.edk = [];
    }
}

/**
 * @interface
 */
class WrappingKeyFactory {
    constructor() {
    }

    /**
     *
     * @param operation {WrappingKeyOperation}
     * @returns {Promise<Unwrapping>}
     */
    primitive(operation) {
        // ...
    }
}

/**
 * @interface
 */
class KeyFactory {
    constructor() {
    }

    /**
     *
     * @param operation {KeyOperation}
     * @returns {Key}
     */
    newKey(operation) {
        // ...
    }

    /**
     *
     * @param operation {KeyOperation}
     * @param keyData {Uint8Array | Buffer}
     * @returns {Key}
     */
    newKeyFromData(operation, keyData) {
        // ...
    }

    /**
     *
     * @param key {Key}
     * @returns {AEAD}
     */
    primitive(key) {
        // ...
    }
}

/**
 *
 * @enum {number}
 */
const AlgorithmType = {
    "unknown_algorithm": 0,
    "aes-gcm-128": 1,
    "aes-gcm-256": 2,
    "xcha-cha-20-poly-1305": 3,
};

/**
 *
 * @enum {string}
 */
const AlgorithmNames = {
    0: "unknown_algorithm",
    1: "aes-gcm-128",
    2: "aes-gcm-256",
    3: "xcha-cha-20-poly-1305",
};

/**
 *
 * @enum {string}
 */
const Algorithms = {
    Unknown: "unknown_algorithm",
    Aesgcm128: "aes-gcm-128",
    Aesgcm256: "aes-gcm-256",
    XChacha20poly1305: "xcha-cha-20-poly-1305",
    RsaSsapkcs12048sha256f4: "RSA_SSA_PKCS1_2048_SHA256_F4",
};

/**
 * @interface
 */
class WrappingKeyOperation {
    constructor() {
    }

    getFormat() {
        // ...
    }

    getFactory() {
        // ...
    }
}

/**
 * @interface
 */
class KeyOperation {
    constructor() {
    }

    /**
     *
     * @returns {KeyFormat}
     */
    getFormat() {
        // ...
    }

    /**
     *
     * @returns {KeyFactory}
     */
    getFactory() {
        // ...
    }
}

/**
 * @interface
 */
class KeyFormat {
    constructor() {
    }

    size() {
        // ...
    }
}

/**
 * @interface
 */
class AEAD {
    constructor() {
    }

    /**
     *
     * @param plaintext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    encrypt(plaintext, associatedData) {
        // ...
    }

    /**
     *
     * @param ciphertext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    decrypt(ciphertext, associatedData) {
        // ...
    }
}

/**
 * @interface
 */
class Unwrapping {
    /**
     *
     */
    constructor() {
    }

    /**
     * @param wdk {Uint8Array}
     * @param epk {Uint8Array}
     * @param fp {Uint8Array}
     * @param password {Uint8Array}
     * @returns {Uint8Array | Buffer | Bytes}
     *
     */
    unwrapKey(wdk, epk, fp, password) {
        // ...
    }
}

/**
 * @interface
 */
class KeyID {
    constructor() {
    }
}

/**
 * @interface
 */
class AlgorithmSerializer {
    constructor() {
    }

    serialise() {
        // ...
    }
}

/**
 * @interface
 */
class AlgorithmDeserializer {
    constructor() {
    }

    deserialise(buffer) {
        // ...
    }

    key() {
        // ...
    }

    version() {
        // ...
    }

    algorithm() {
        // ...
    }
}

/**
 * @interface
 */
class KeyData {
    constructor() {
    }

    getValue() {
        // ...
    }

    fromValue(data) {
        // ...
    }

    getKeyMaterialType() {
        // ...
    }

    getVersion() {
        // ...
    }
}

/**
 * @interface
 */
class Key {
    constructor() {
    }

    getKeyID() {
        // ...
    }

    getOperation() {
        // ...
    }

    getData() {
        // ...
    }
}

/**
 *
 * @type {number}
 */
const AESGCMKeyVersion = 0;
/**
 *
 * @type {number}
 */
const RSASSAPKCS1KeyVersion = 0;
/**
 *
 * @type {number}
 */
const XchaCha20Poly1305KeyVersion = 0;

/**
 *
 * @enum {number}
 */
const HashType = {
    UNKNOWN_HASH: 0,
    SHA1: 1,
    SHA384: 2,
    SHA256: 3,
    SHA512: 4,
    SHA224: 5,
};

const HashTypeName = [
    "UNKNOWN_HASH",
    "SHA1",
    "SHA384",
    "SHA256",
    "SHA512",
    "SHA224",
];

/**
 *
 * @enum {number}
 */
const KeyMaterialType = {
    UNKNOWN_KEYMATERIAL: 0,
    SYMMETRIC: 1,
    ASYMMETRIC_PRIVATE: 2,
    ASYMMETRIC_PUBLIC: 3,
    REMOTE: 4,
};

/**
 * @class
 * @implements {KeyFormat}
 */
class AesGcmKeyFormat {

    /**
     *
     * @param size {number}
     * @param version {number}
     */
    constructor(size, version) {
        /**
         *
         * @type {number}
         */
        this.keySize = size;
        /**
         *
         * @type {number}
         */
        this.version = version;
    }

    /**
     *
     * @returns {number}
     */
    size() {
        return this.keySize;
    }
}

/**
 * @class
 * @implements {KeyFormat}
 */
class XChaChaKeyFormat {
    /**
     *
     * @param size {number}
     * @param version {number}
     */
    constructor(size, version) {
        /**
         *
         * @type {number}
         */
        this.keySize = size;
        /**
         *
         * @type {number}
         */
        this.version = version;
    }

    /**
     *
     * @returns {number}
     */
    size() {
        return this.keySize;
    }
}

/**
 * @class
 * @implements {KeyFormat}
 */
class RsaSsaPkcs1KeyFormat {
    /**
     *
     * @param version {number}
     * @param hashType {HashType}
     */
    constructor(version, hashType) {
        /**
         *
         * @type {number}
         */
        this.version = version;
        /**
         *
         * @type {HashType}
         */
        this.hash = hashType;
    }

    /**
     *
     * @returns {number}
     */
    size() {
        return -1;
    }
}

module.exports = {
    OnqlaveStructure,
    WrappingKeyFactory,
    KeyFactory,
    WrappingKeyOperation,
    KeyOperation,
    KeyFormat,
    AEAD,
    Unwrapping,
    KeyID,
    AlgorithmSerializer,
    AlgorithmDeserializer,
    KeyData,
    Key,
    AlgorithmType,
    HashType,
    HashTypeName,
    KeyMaterialType,
    AESGCMKeyVersion,
    RSASSAPKCS1KeyVersion,
    XchaCha20Poly1305KeyVersion,
    AlgorithmNames,
    Algorithms,
    AesGcmKeyFormat,
    RsaSsaPkcs1KeyFormat,
    XChaChaKeyFormat,
    KeyManagerClient,
};

"use strict";
/**
 * @interface
 * @typedef {import('node-forge').Bytes} Bytes
 */
var KeyManagerClient = /** @class */ (function () {
    function KeyManagerClient() {
    }
    KeyManagerClient.prototype.fetchEncryptionKey = function () {
        //
    };
    /**
     *
     * @param edk {Uint8Array}
     * @returns {Promise<Uint8Array | Buffer | Bytes>}
     */
    KeyManagerClient.prototype.fetchDecryptionKey = function (edk) {
        //
    };
    return KeyManagerClient;
}());
/**
 * @interface
 */
var OnqlaveStructure = /** @class */ (function () {
    function OnqlaveStructure() {
        this.embeded = {};
        this.edk = [];
    }
    return OnqlaveStructure;
}());
/**
 * @interface
 */
var WrappingKeyFactory = /** @class */ (function () {
    function WrappingKeyFactory() {
    }
    /**
     *
     * @param operation {WrappingKeyOperation}
     * @returns {Promise<Unwrapping>}
     */
    WrappingKeyFactory.prototype.primitive = function (operation) {
        // ...
    };
    return WrappingKeyFactory;
}());
/**
 * @interface
 */
var KeyFactory = /** @class */ (function () {
    function KeyFactory() {
    }
    /**
     *
     * @param operation {KeyOperation}
     * @returns {Key}
     */
    KeyFactory.prototype.newKey = function (operation) {
        // ...
    };
    /**
     *
     * @param operation {KeyOperation}
     * @param keyData {Uint8Array | Buffer}
     * @returns {Key}
     */
    KeyFactory.prototype.newKeyFromData = function (operation, keyData) {
        // ...
    };
    /**
     *
     * @param key {Key}
     * @returns {AEAD}
     */
    KeyFactory.prototype.primitive = function (key) {
        // ...
    };
    return KeyFactory;
}());
/**
 *
 * @enum {number}
 */
var AlgorithmType = {
    "unknown_algorithm": 0,
    "aes-gcm-128": 1,
    "aes-gcm-256": 2,
    "xcha-cha-20-poly-1305": 3,
};
/**
 *
 * @enum {string}
 */
var AlgorithmNames = {
    0: "unknown_algorithm",
    1: "aes-gcm-128",
    2: "aes-gcm-256",
    3: "xcha-cha-20-poly-1305",
};
/**
 *
 * @enum {string}
 */
var Algorithms = {
    Unknown: "unknown_algorithm",
    Aesgcm128: "aes-gcm-128",
    Aesgcm256: "aes-gcm-256",
    XChacha20poly1305: "xcha-cha-20-poly-1305",
    RsaSsapkcs12048sha256f4: "RSA_SSA_PKCS1_2048_SHA256_F4",
};
/**
 * @interface
 */
var WrappingKeyOperation = /** @class */ (function () {
    function WrappingKeyOperation() {
    }
    WrappingKeyOperation.prototype.getFormat = function () {
        // ...
    };
    WrappingKeyOperation.prototype.getFactory = function () {
        // ...
    };
    return WrappingKeyOperation;
}());
/**
 * @interface
 */
var KeyOperation = /** @class */ (function () {
    function KeyOperation() {
    }
    /**
     *
     * @returns {KeyFormat}
     */
    KeyOperation.prototype.getFormat = function () {
        // ...
    };
    /**
     *
     * @returns {KeyFactory}
     */
    KeyOperation.prototype.getFactory = function () {
        // ...
    };
    return KeyOperation;
}());
/**
 * @interface
 */
var KeyFormat = /** @class */ (function () {
    function KeyFormat() {
    }
    KeyFormat.prototype.size = function () {
        // ...
    };
    return KeyFormat;
}());
/**
 * @interface
 */
var AEAD = /** @class */ (function () {
    function AEAD() {
    }
    /**
     *
     * @param plaintext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    AEAD.prototype.encrypt = function (plaintext, associatedData) {
        // ...
    };
    /**
     *
     * @param ciphertext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    AEAD.prototype.decrypt = function (ciphertext, associatedData) {
        // ...
    };
    return AEAD;
}());
/**
 * @interface
 */
var Unwrapping = /** @class */ (function () {
    /**
     *
     */
    function Unwrapping() {
    }
    /**
     * @param wdk {Uint8Array}
     * @param epk {Uint8Array}
     * @param fp {Uint8Array}
     * @param password {Uint8Array}
     * @returns {Uint8Array | Buffer | Bytes}
     *
     */
    Unwrapping.prototype.unwrapKey = function (wdk, epk, fp, password) {
        // ...
    };
    return Unwrapping;
}());
/**
 * @interface
 */
var KeyID = /** @class */ (function () {
    function KeyID() {
    }
    return KeyID;
}());
/**
 * @interface
 */
var AlgorithmSerializer = /** @class */ (function () {
    function AlgorithmSerializer() {
    }
    AlgorithmSerializer.prototype.serialise = function () {
        // ...
    };
    return AlgorithmSerializer;
}());
/**
 * @interface
 */
var AlgorithmDeserializer = /** @class */ (function () {
    function AlgorithmDeserializer() {
    }
    AlgorithmDeserializer.prototype.deserialise = function (buffer) {
        // ...
    };
    AlgorithmDeserializer.prototype.key = function () {
        // ...
    };
    AlgorithmDeserializer.prototype.version = function () {
        // ...
    };
    AlgorithmDeserializer.prototype.algorithm = function () {
        // ...
    };
    return AlgorithmDeserializer;
}());
/**
 * @interface
 */
var KeyData = /** @class */ (function () {
    function KeyData() {
    }
    KeyData.prototype.getValue = function () {
        // ...
    };
    KeyData.prototype.fromValue = function (data) {
        // ...
    };
    KeyData.prototype.getKeyMaterialType = function () {
        // ...
    };
    KeyData.prototype.getVersion = function () {
        // ...
    };
    return KeyData;
}());
/**
 * @interface
 */
var Key = /** @class */ (function () {
    function Key() {
    }
    Key.prototype.getKeyID = function () {
        // ...
    };
    Key.prototype.getOperation = function () {
        // ...
    };
    Key.prototype.getData = function () {
        // ...
    };
    return Key;
}());
/**
 *
 * @type {number}
 */
var AESGCMKeyVersion = 0;
/**
 *
 * @type {number}
 */
var RSASSAPKCS1KeyVersion = 0;
/**
 *
 * @type {number}
 */
var XchaCha20Poly1305KeyVersion = 0;
/**
 *
 * @enum {number}
 */
var HashType = {
    UNKNOWN_HASH: 0,
    SHA1: 1,
    SHA384: 2,
    SHA256: 3,
    SHA512: 4,
    SHA224: 5,
};
var HashTypeName = [
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
var KeyMaterialType = {
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
var AesGcmKeyFormat = /** @class */ (function () {
    /**
     *
     * @param size {number}
     * @param version {number}
     */
    function AesGcmKeyFormat(size, version) {
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
    AesGcmKeyFormat.prototype.size = function () {
        return this.keySize;
    };
    return AesGcmKeyFormat;
}());
/**
 * @class
 * @implements {KeyFormat}
 */
var XChaChaKeyFormat = /** @class */ (function () {
    /**
     *
     * @param size {number}
     * @param version {number}
     */
    function XChaChaKeyFormat(size, version) {
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
    XChaChaKeyFormat.prototype.size = function () {
        return this.keySize;
    };
    return XChaChaKeyFormat;
}());
/**
 * @class
 * @implements {KeyFormat}
 */
var RsaSsaPkcs1KeyFormat = /** @class */ (function () {
    /**
     *
     * @param version {number}
     * @param hashType {HashType}
     */
    function RsaSsaPkcs1KeyFormat(version, hashType) {
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
    RsaSsaPkcs1KeyFormat.prototype.size = function () {
        return -1;
    };
    return RsaSsaPkcs1KeyFormat;
}());
module.exports = {
    OnqlaveStructure: OnqlaveStructure,
    WrappingKeyFactory: WrappingKeyFactory,
    KeyFactory: KeyFactory,
    WrappingKeyOperation: WrappingKeyOperation,
    KeyOperation: KeyOperation,
    KeyFormat: KeyFormat,
    AEAD: AEAD,
    Unwrapping: Unwrapping,
    KeyID: KeyID,
    AlgorithmSerializer: AlgorithmSerializer,
    AlgorithmDeserializer: AlgorithmDeserializer,
    KeyData: KeyData,
    Key: Key,
    AlgorithmType: AlgorithmType,
    HashType: HashType,
    HashTypeName: HashTypeName,
    KeyMaterialType: KeyMaterialType,
    AESGCMKeyVersion: AESGCMKeyVersion,
    RSASSAPKCS1KeyVersion: RSASSAPKCS1KeyVersion,
    XchaCha20Poly1305KeyVersion: XchaCha20Poly1305KeyVersion,
    AlgorithmNames: AlgorithmNames,
    Algorithms: Algorithms,
    AesGcmKeyFormat: AesGcmKeyFormat,
    RsaSsaPkcs1KeyFormat: RsaSsaPkcs1KeyFormat,
    XChaChaKeyFormat: XChaChaKeyFormat,
    KeyManagerClient: KeyManagerClient,
};
//# sourceMappingURL=types.js.map
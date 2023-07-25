"use strict";
var EncryptionSecurityModel = /** @class */ (function () {
    function EncryptionSecurityModel(algorithm, wrappingAlgorithm) {
        this.algorithm = algorithm;
        this.wrappingAlgorithm = wrappingAlgorithm;
    }
    EncryptionSecurityModel.prototype.validate = function () {
        if (!this.algorithm) {
            throw new Error("algorithm is required");
        }
        if (!this.wrappingAlgorithm) {
            throw new Error("wrapping algorithm is required");
        }
    };
    return EncryptionSecurityModel;
}());
var WrappingKey = /** @class */ (function () {
    function WrappingKey(encryptedPrivateKey, keyFingerprint) {
        this.encryptedPrivateKey = encryptedPrivateKey;
        this.keyFingerprint = keyFingerprint;
    }
    WrappingKey.prototype.validate = function () {
        if (!this.encryptedPrivateKey) {
            throw new Error("encrypted private key is required");
        }
        if (!this.keyFingerprint) {
            throw new Error("key fingerprint is required");
        }
    };
    return WrappingKey;
}());
var DataEncryptionKey = /** @class */ (function () {
    function DataEncryptionKey(encryptedDataKey, wrappedDataKey) {
        this.encryptedDataKey = encryptedDataKey;
        this.wrappedDataKey = wrappedDataKey;
    }
    DataEncryptionKey.prototype.validate = function () {
        if (!this.encryptedDataKey) {
            throw new Error("encrypted data key is required");
        }
        if (!this.wrappedDataKey) {
            throw new Error("wrapped data key is required");
        }
    };
    return DataEncryptionKey;
}());
var DataDecryptionKey = /** @class */ (function () {
    function DataDecryptionKey(wrappedDataKey) {
        this.wrappedDataKey = wrappedDataKey;
    }
    DataDecryptionKey.prototype.validate = function () {
        if (!this.wrappedDataKey) {
            throw new Error("wrapped data key is required");
        }
    };
    return DataDecryptionKey;
}());
module.exports = {
    EncryptionSecurityModel: EncryptionSecurityModel,
    WrappingKey: WrappingKey,
    DataEncryptionKey: DataEncryptionKey,
    DataDecryptionKey: DataDecryptionKey,
};
//# sourceMappingURL=contracts.js.map
"use strict";
var _a = require("../types/types"), Key = _a.Key, KeyData = _a.KeyData;
/**
 * @class
 * @implements {Key}
 */
var XChaCha20Poly1305Key = /** @class */ (function () {
    /**
     *
     * @param keyID {number}
     * @param operation {KeyOperation}
     * @param data {AesGcmKeyData}
     */
    function XChaCha20Poly1305Key(keyID, operation, data) {
        this.keyID = keyID;
        this.operation = operation;
        this.data = data;
    }
    /**
     *
     * @returns {number}
     */
    XChaCha20Poly1305Key.prototype.getKeyID = function () {
        return this.keyID;
    };
    /**
     *
     * @returns {KeyOperation}
     */
    XChaCha20Poly1305Key.prototype.getOperation = function () {
        return this.operation;
    };
    /**
     *
     * @returns {KeyData}
     */
    XChaCha20Poly1305Key.prototype.getData = function () {
        return this.data;
    };
    return XChaCha20Poly1305Key;
}());
/**
 * @class
 * @implements {KeyData}
 */
var XChaCha20Poly1305KeyData = /** @class */ (function () {
    function XChaCha20Poly1305KeyData(value, keyMaterialType, version) {
        this.value = value;
        this.keyMaterialType = keyMaterialType;
        this.version = version;
    }
    XChaCha20Poly1305KeyData.prototype.fromValue = function () {
        return null;
    };
    /**
     *
     * @returns {Uint8Array | Buffer}
     */
    XChaCha20Poly1305KeyData.prototype.getValue = function () {
        return this.value;
    };
    XChaCha20Poly1305KeyData.prototype.getKeyMaterialType = function () {
        return this.keyMaterialType;
    };
    /**
     *
     * @returns {number}
     */
    XChaCha20Poly1305KeyData.prototype.getVersion = function () {
        return this.version;
    };
    return XChaCha20Poly1305KeyData;
}());
module.exports = {
    XChaCha20Poly1305Key: XChaCha20Poly1305Key,
    XChaCha20Poly1305KeyData: XChaCha20Poly1305KeyData,
    NewXChaCha20Poly1305Key: function (id, operation, data) {
        return new XChaCha20Poly1305Key(id, operation, data);
    }
};
//# sourceMappingURL=xchacha20poly1305.js.map
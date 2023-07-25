"use strict";
var _a = require("../types/types"), Key = _a.Key, KeyData = _a.KeyData, KeyOperation = _a.KeyOperation;
/**
 * @class
 * @implements {Key}
 */
var AesGcmKey = /** @class */ (function () {
    /**
     *
     * @param keyID {number}
     * @param operation {KeyOperation}
     * @param data {AesGcmKeyData}
     */
    function AesGcmKey(keyID, operation, data) {
        this.keyID = keyID;
        this.operation = operation;
        this.data = data;
    }
    /**
     *
     * @returns {number}
     */
    AesGcmKey.prototype.getKeyID = function () {
        return this.keyID;
    };
    /**
     *
     * @returns {KeyOperation}
     */
    AesGcmKey.prototype.getOperation = function () {
        return this.operation;
    };
    /**
     *
     * @returns {KeyData}
     */
    AesGcmKey.prototype.getData = function () {
        return this.data;
    };
    return AesGcmKey;
}());
/**
 * @class
 * @implements {KeyData}
 */
var AesGcmKeyData = /** @class */ (function () {
    function AesGcmKeyData(value, keyMaterialType, version) {
        this.value = value;
        this.keyMaterialType = keyMaterialType;
        this.version = version;
    }
    AesGcmKeyData.prototype.fromValue = function () {
        return null;
    };
    /**
     *
     * @returns {Uint8Array | Buffer}
     */
    AesGcmKeyData.prototype.getValue = function () {
        return this.value;
    };
    AesGcmKeyData.prototype.getKeyMaterialType = function () {
        return this.keyMaterialType;
    };
    /**
     *
     * @returns {number}
     */
    AesGcmKeyData.prototype.getVersion = function () {
        return this.version;
    };
    return AesGcmKeyData;
}());
module.exports = {
    AesGcmKey: AesGcmKey,
    AesGcmKeyData: AesGcmKeyData,
    NewAesGcmKey: function (id, operation, data) {
        return new AesGcmKey(id, operation, data);
    },
};
//# sourceMappingURL=aesgcm.js.map
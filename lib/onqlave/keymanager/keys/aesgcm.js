"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a = require("../types/types"), Key = _a.Key, KeyData = _a.KeyData;
var AesGcmKey = /** @class */ (function (_super) {
    __extends(AesGcmKey, _super);
    function AesGcmKey(keyID, operation, data) {
        var _this = _super.call(this) || this;
        _this.keyID = keyID;
        _this.operation = operation;
        _this.data = data;
        return _this;
    }
    AesGcmKey.prototype.getKeyID = function () {
        return this.keyID;
    };
    AesGcmKey.prototype.getOperation = function () {
        return this.operation;
    };
    AesGcmKey.prototype.getData = function () {
        return this.data;
    };
    return AesGcmKey;
}(Key));
var AesGcmKeyData = /** @class */ (function (_super) {
    __extends(AesGcmKeyData, _super);
    function AesGcmKeyData(value, keyMaterialType, version) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.keyMaterialType = keyMaterialType;
        _this.version = version;
        return _this;
    }
    AesGcmKeyData.prototype.fromValue = function () {
        return null;
    };
    AesGcmKeyData.prototype.getValue = function () {
        return this.value;
    };
    AesGcmKeyData.prototype.getKeyMaterialType = function () {
        return this.keyMaterialType;
    };
    AesGcmKeyData.prototype.getVersion = function () {
        return this.version;
    };
    return AesGcmKeyData;
}(KeyData));
module.exports = {
    AesGcmKey: AesGcmKey,
    AesGcmKeyData: AesGcmKeyData,
    NewAesGcmKey: function (id, operation, data) {
        return new AesGcmKey(id, operation, data);
    },
};
//# sourceMappingURL=aesgcm.js.map
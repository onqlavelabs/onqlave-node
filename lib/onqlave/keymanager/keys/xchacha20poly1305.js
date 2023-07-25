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
var XChaCha20Poly1305Key = /** @class */ (function (_super) {
    __extends(XChaCha20Poly1305Key, _super);
    function XChaCha20Poly1305Key(keyID, operation, data) {
        var _this = _super.call(this) || this;
        _this.keyID = keyID;
        _this.operation = operation;
        _this.data = data;
        return _this;
    }
    XChaCha20Poly1305Key.prototype.getKeyID = function () {
        return this.keyID;
    };
    XChaCha20Poly1305Key.prototype.getOperation = function () {
        return this.operation;
    };
    XChaCha20Poly1305Key.prototype.getData = function () {
        return this.data;
    };
    return XChaCha20Poly1305Key;
}(Key));
var XChaCha20Poly1305KeyData = /** @class */ (function (_super) {
    __extends(XChaCha20Poly1305KeyData, _super);
    function XChaCha20Poly1305KeyData(value, keyMaterialType, version) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.keyMaterialType = keyMaterialType;
        _this.version = version;
        return _this;
    }
    XChaCha20Poly1305KeyData.prototype.fromValue = function () {
        return null;
    };
    XChaCha20Poly1305KeyData.prototype.getValue = function () {
        return this.value;
    };
    XChaCha20Poly1305KeyData.prototype.getKeyMaterialType = function () {
        return this.keyMaterialType;
    };
    XChaCha20Poly1305KeyData.prototype.getVersion = function () {
        return this.version;
    };
    return XChaCha20Poly1305KeyData;
}(KeyData));
module.exports = {
    XChaCha20Poly1305Key: XChaCha20Poly1305Key,
    XChaCha20Poly1305KeyData: XChaCha20Poly1305KeyData,
    NewXChaCha20Poly1305Key: function (id, operation, data) {
        return new XChaCha20Poly1305Key(id, operation, data);
    }
};
//# sourceMappingURL=xchacha20poly1305.js.map
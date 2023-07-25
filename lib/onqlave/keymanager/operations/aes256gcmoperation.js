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
var _a = require("../types/types"), KeyOperation = _a.KeyOperation, AESGCMKeyVersion = _a.AESGCMKeyVersion, AesGcmKeyFormat = _a.AesGcmKeyFormat;
var Aes256GcmKeyOperation = /** @class */ (function (_super) {
    __extends(Aes256GcmKeyOperation, _super);
    function Aes256GcmKeyOperation(factory) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.format = new AesGcmKeyFormat(32, AESGCMKeyVersion);
        return _this;
    }
    Aes256GcmKeyOperation.prototype.getFormat = function () {
        return this.format;
    };
    Aes256GcmKeyOperation.prototype.getFactory = function () {
        return this.factory;
    };
    return Aes256GcmKeyOperation;
}(KeyOperation));
module.exports = {
    Aes256GcmKeyOperation: Aes256GcmKeyOperation,
    NewAES256GCMKeyOperation: function (factory) {
        return new Aes256GcmKeyOperation(factory);
    },
};
//# sourceMappingURL=aes256gcmoperation.js.map
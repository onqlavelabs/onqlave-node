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
var Aes128GcmKeyOperation = /** @class */ (function (_super) {
    __extends(Aes128GcmKeyOperation, _super);
    function Aes128GcmKeyOperation(factory) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.format = new AesGcmKeyFormat(16, AESGCMKeyVersion);
        return _this;
    }
    Aes128GcmKeyOperation.prototype.getFormat = function () {
        return this.format;
    };
    Aes128GcmKeyOperation.prototype.getFactory = function () {
        return this.factory;
    };
    return Aes128GcmKeyOperation;
}(KeyOperation));
module.exports = {
    Aes128GcmKeyOperation: Aes128GcmKeyOperation,
    NewAES128GCMKeyOperation: function (factory) {
        return new Aes128GcmKeyOperation(factory);
    },
};
//# sourceMappingURL=aes128gcmoperation.js.map
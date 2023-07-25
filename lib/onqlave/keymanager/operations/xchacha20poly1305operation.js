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
var _a = require("../types/types"), KeyOperation = _a.KeyOperation, XchaCha20Poly1305KeyVersion = _a.XchaCha20Poly1305KeyVersion, XChaChaKeyFormat = _a.XChaChaKeyFormat;
var XChaCha20Poly1305KeyOperation = /** @class */ (function (_super) {
    __extends(XChaCha20Poly1305KeyOperation, _super);
    function XChaCha20Poly1305KeyOperation(factory) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.format = new XChaChaKeyFormat(32, XchaCha20Poly1305KeyVersion);
        return _this;
    }
    XChaCha20Poly1305KeyOperation.prototype.getFormat = function () {
        return this.format;
    };
    XChaCha20Poly1305KeyOperation.prototype.getFactory = function () {
        return this.factory;
    };
    return XChaCha20Poly1305KeyOperation;
}(KeyOperation));
module.exports = {
    XChaCha20Poly1305KeyOperation: XChaCha20Poly1305KeyOperation,
    NewXChaCha20Poly1305KeyOperation: function (factory) {
        return new XChaCha20Poly1305KeyOperation(factory);
    },
};
//# sourceMappingURL=xchacha20poly1305operation.js.map
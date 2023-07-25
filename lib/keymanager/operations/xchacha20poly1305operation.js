"use strict";
var _a = require("../types/types"), KeyOperation = _a.KeyOperation, XchaCha20Poly1305KeyVersion = _a.XchaCha20Poly1305KeyVersion, XChaChaKeyFormat = _a.XChaChaKeyFormat, KeyFormat = _a.KeyFormat, KeyFactory = _a.KeyFactory;
/**
 * @class
 * @implements {KeyOperation}
 */
var XChaCha20Poly1305KeyOperation = /** @class */ (function () {
    function XChaCha20Poly1305KeyOperation(factory) {
        this.factory = factory;
        this.format = new XChaChaKeyFormat(32, XchaCha20Poly1305KeyVersion);
    }
    /**
     *
     * @returns {KeyFormat}
     */
    XChaCha20Poly1305KeyOperation.prototype.getFormat = function () {
        return this.format;
    };
    /**
     *
     * @returns {KeyFactory}
     */
    XChaCha20Poly1305KeyOperation.prototype.getFactory = function () {
        return this.factory;
    };
    return XChaCha20Poly1305KeyOperation;
}());
module.exports = {
    XChaCha20Poly1305KeyOperation: XChaCha20Poly1305KeyOperation,
    NewXChaCha20Poly1305KeyOperation: function (factory) {
        return new XChaCha20Poly1305KeyOperation(factory);
    },
};
//# sourceMappingURL=xchacha20poly1305operation.js.map
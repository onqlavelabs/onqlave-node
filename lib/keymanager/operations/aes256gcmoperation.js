"use strict";
var _a = require("../types/types"), KeyOperation = _a.KeyOperation, AESGCMKeyVersion = _a.AESGCMKeyVersion, AesGcmKeyFormat = _a.AesGcmKeyFormat, KeyFactory = _a.KeyFactory, KeyFormat = _a.KeyFormat;
/**
 * @class
 * @implements {KeyOperation}
 */
var Aes256GcmKeyOperation = /** @class */ (function () {
    /**
     *
     * @param factory {KeyFactory}
     */
    function Aes256GcmKeyOperation(factory) {
        this.factory = factory;
        this.format = new AesGcmKeyFormat(32, AESGCMKeyVersion);
    }
    /**
     *
     * @returns {KeyFormat}
     */
    Aes256GcmKeyOperation.prototype.getFormat = function () {
        return this.format;
    };
    /**
     *
     * @returns {KeyFactory}
     */
    Aes256GcmKeyOperation.prototype.getFactory = function () {
        return this.factory;
    };
    return Aes256GcmKeyOperation;
}());
module.exports = {
    Aes256GcmKeyOperation: Aes256GcmKeyOperation,
    NewAES256GCMKeyOperation: function (factory) {
        return new Aes256GcmKeyOperation(factory);
    },
};
//# sourceMappingURL=aes256gcmoperation.js.map
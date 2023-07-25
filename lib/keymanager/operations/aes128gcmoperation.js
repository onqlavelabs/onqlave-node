"use strict";
var _a = require("../types/types"), KeyOperation = _a.KeyOperation, AESGCMKeyVersion = _a.AESGCMKeyVersion, AesGcmKeyFormat = _a.AesGcmKeyFormat, KeyFactory = _a.KeyFactory, KeyFormat = _a.KeyFormat;
/**
 * @class
 * @implements {KeyOperation}
 */
var Aes128GcmKeyOperation = /** @class */ (function () {
    /**
     *
     * @param factory {KeyFactory}
     */
    function Aes128GcmKeyOperation(factory) {
        this.factory = factory;
        this.format = new AesGcmKeyFormat(16, AESGCMKeyVersion);
    }
    /**
     *
     * @returns {KeyFormat}
     */
    Aes128GcmKeyOperation.prototype.getFormat = function () {
        return this.format;
    };
    /**
     *
     * @returns {KeyFactory}
     */
    Aes128GcmKeyOperation.prototype.getFactory = function () {
        return this.factory;
    };
    return Aes128GcmKeyOperation;
}());
module.exports = {
    Aes128GcmKeyOperation: Aes128GcmKeyOperation,
    NewAES128GCMKeyOperation: function (factory) {
        return new Aes128GcmKeyOperation(factory);
    },
};
//# sourceMappingURL=aes128gcmoperation.js.map
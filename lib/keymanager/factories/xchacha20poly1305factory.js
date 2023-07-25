"use strict";
var NewXChaCha20Poly1305AEAD = require("../primitives/xchacha20poly1305aead").NewXChaCha20Poly1305AEAD;
var _a = require("../types/types"), KeyMaterialType = _a.KeyMaterialType, XchaCha20Poly1305KeyVersion = _a.XchaCha20Poly1305KeyVersion, KeyFactory = _a.KeyFactory;
var _b = require("../keys/xchacha20poly1305"), XChaCha20Poly1305Key = _b.XChaCha20Poly1305Key, XChaCha20Poly1305KeyData = _b.XChaCha20Poly1305KeyData;
var IDService = require("../services/idgenservice").IDService;
var CPRNGService = require("../services/cprngservice").CPRNGService;
var _c = require("../types/types"), KeyOperation = _c.KeyOperation, Key = _c.Key, AEAD = _c.AEAD;
/**
 * @class
 * @implements {KeyFactory}
 */
var XChaCha20Poly1305KeyFactory = /** @class */ (function () {
    /**
     *
     * @param idService {IDService}
     * @param randomService {CPRNGService}
     */
    function XChaCha20Poly1305KeyFactory(idService, randomService) {
        this.idService = idService;
        this.randomService = randomService;
    }
    /**
     *
     * @param operation {KeyOperation}
     * @returns {Key}
     */
    XChaCha20Poly1305KeyFactory.prototype.newKey = function (operation) {
        var format = operation.getFormat();
        this.validateKeyFormat(format);
        var keyValue = this.randomService.getRandomBytes(format.size());
        var key = new XChaCha20Poly1305Key(this.idService.newKeyID(), operation, new XChaCha20Poly1305KeyData(keyValue, KeyMaterialType.SYMMETRIC, XchaCha20Poly1305KeyVersion));
        return key;
    };
    /**
     *
     * @param operation {KeyOperation}
     * @param keyData {Uint8Array | Buffer}
     * @returns {Key}
     */
    XChaCha20Poly1305KeyFactory.prototype.newKeyFromData = function (operation, keyData) {
        var format = operation.getFormat();
        this.validateKeyFormat(format);
        return new XChaCha20Poly1305Key(this.idService.newKeyID(), operation, new XChaCha20Poly1305KeyData(keyData, KeyMaterialType.SYMMETRIC, XchaCha20Poly1305KeyVersion));
    };
    /**
     *
     * @param key {Key}
     * @returns {AEAD}
     */
    XChaCha20Poly1305KeyFactory.prototype.primitive = function (key) {
        var value = this.validateKey(key);
        var aead = NewXChaCha20Poly1305AEAD(value, this.randomService);
        if (!aead) {
            return Promise.reject(new Error("xchachapoly1305factory: cannot create new primitive"));
        }
        return aead;
    };
    XChaCha20Poly1305KeyFactory.prototype.validateKey = function (key) {
        var keyData = key.getData();
        this.validateKeyVersion(keyData.getVersion(), XchaCha20Poly1305KeyVersion);
        var value = keyData.getValue();
        if (!value) {
            throw new Error("xchachapoly1305factory: invalid key value");
        }
        var keySize = value.length;
        if (keySize !== 32) {
            throw new Error("xchachapoly1305factory: invalid key size");
        }
        return value;
    };
    XChaCha20Poly1305KeyFactory.prototype.validateKeyFormat = function (format) {
        if (format.size() !== 32) {
            throw new Error("xchachapoly1305factory: invalid key size");
        }
    };
    XChaCha20Poly1305KeyFactory.prototype.validateKeyVersion = function (version, maxExpected) {
        if (version > maxExpected) {
            throw new Error("key has version ".concat(version, "; only keys with version in range [0..").concat(maxExpected, "] are supported"));
        }
    };
    return XChaCha20Poly1305KeyFactory;
}());
module.exports = {
    XChaCha20Poly1305KeyFactory: XChaCha20Poly1305KeyFactory,
    NewXChaCha20Poly1305KeyFactory: function (idService, randomService) {
        return new XChaCha20Poly1305KeyFactory(idService, randomService);
    }
};
//# sourceMappingURL=xchacha20poly1305factory.js.map
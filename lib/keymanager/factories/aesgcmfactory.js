"use strict";
var _a = require("../types/types"), KeyFactory = _a.KeyFactory, KeyMaterialType = _a.KeyMaterialType, AESGCMKeyVersion = _a.AESGCMKeyVersion;
var NewAESGCMAEAD = require("../primitives/aesgcmaead").NewAESGCMAEAD;
var _b = require("../keys/aesgcm"), AesGcmKeyData = _b.AesGcmKeyData, NewAesGcmKey = _b.NewAesGcmKey;
var IDService = require("../services/idgenservice").IDService;
var CPRNGService = require("../services/cprngservice").CPRNGService;
var _c = require("../types/types"), KeyOperation = _c.KeyOperation, Key = _c.Key, AEAD = _c.AEAD;
/**
 * @class
 * @implements {KeyFactory}
 */
var AesGcmKeyFactory = /** @class */ (function () {
    /**
     *
     * @param idService {IDService}
     * @param randomService {CPRNGService}
     */
    function AesGcmKeyFactory(idService, randomService) {
        this.idService = idService;
        this.randomService = randomService;
    }
    /**
     *
     * @param operation {KeyOperation}
     * @returns {Key}
     */
    AesGcmKeyFactory.prototype.newKey = function (operation) {
        var format = operation.getFormat();
        this.validateKeyFormat(format);
        var keyValue = this.randomService.getRandomBytes(format.size());
        var key = NewAesGcmKey(this.idService.newKeyID(), operation, new AesGcmKeyData(keyValue, KeyMaterialType.SYMMETRIC, AESGCMKeyVersion));
        return key;
    };
    /**
     *
     * @param operation {KeyOperation}
     * @param keyData {Uint8Array | Buffer}
     * @returns {Key}
     */
    AesGcmKeyFactory.prototype.newKeyFromData = function (operation, keyData) {
        var format = operation.getFormat();
        this.validateKeyFormat(format);
        var key = NewAesGcmKey(this.idService.newKeyID(), operation, new AesGcmKeyData(keyData, KeyMaterialType.SYMMETRIC, AESGCMKeyVersion));
        return key;
    };
    /**
     *
     * @param key {Key}
     * @returns {AEAD}
     */
    AesGcmKeyFactory.prototype.primitive = function (key) {
        var value = this.validateKey(key);
        var aead = NewAESGCMAEAD(value, this.randomService);
        return aead;
    };
    AesGcmKeyFactory.prototype.validateKey = function (key) {
        var keyData = key.getData();
        this.validateKeyVersion(keyData.getVersion(), AESGCMKeyVersion);
        var value = keyData.getValue();
        if (!value) {
            throw new Error("aesgcmfactory: invalid key value");
        }
        var keySize = value.length;
        if (keySize !== 16 && keySize !== 32) {
            throw new Error("aesgcmfactory: invalid key size");
        }
        return value;
    };
    AesGcmKeyFactory.prototype.validateKeyVersion = function (version, maxExpected) {
        if (version > maxExpected) {
            throw new Error("aesgcmfactory: invalid key version");
        }
    };
    AesGcmKeyFactory.prototype.validateKeyFormat = function (format) {
        var keySize = format.size();
        if (keySize !== 16 && keySize !== 32) {
            throw new Error("aesgcmfactory: invalid key format");
        }
    };
    return AesGcmKeyFactory;
}());
module.exports = {
    AesGcmKeyFactory: AesGcmKeyFactory,
    NewAEADGCMKeyFactory: function (idService, randomService) {
        return new AesGcmKeyFactory(idService, randomService);
    }
};
//# sourceMappingURL=aesgcmfactory.js.map
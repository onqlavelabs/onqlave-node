"use strict";
var _a = require("node-forge"), cipher = _a.cipher, util = _a.util;
var AEAD = require("../types/types").AEAD;
var CPRNGService = require("../services/cprngservice").CPRNGService;
/**
 *
 * @type {number}
 */
var AESGCMIVSize = 12;
/**
 *
 * @type {number}
 */
var AESGCMTagSize = 16;
/**
 * @class
 * @implements {AEAD}
 * @typedef {import('node-forge').util.ByteStringBuffer} ByteStringBuffer
 */
var AESGCMAEAD = /** @class */ (function () {
    /**
     *
     * @param key {any}
     * @param randomService {CPRNGService}
     */
    function AESGCMAEAD(key, randomService) {
        this.randomService = randomService;
        this.key = key;
        this.prependIV = true;
    }
    AESGCMAEAD.prototype.validateAESKeySize = function (sizeInBytes) {
        if (sizeInBytes === 16 || sizeInBytes === 32) {
            return null;
        }
        else {
            throw new Error("aesgcmaead: invalid AES key size; want 16 or 32, got ".concat(sizeInBytes));
        }
    };
    /**
     *
     * @param plaintext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    AESGCMAEAD.prototype.encrypt = function (plaintext, associatedData) {
        var iv = this.randomService.getRandomBytes(AESGCMIVSize);
        if (iv.length !== AESGCMIVSize) {
            throw new Error("aesgcmaead: unexpected IV size: got ".concat(iv.length, ", want ").concat(AESGCMIVSize));
        }
        var c = cipher.createCipher("AES-GCM", this.key);
        if (associatedData != null) {
            c.start({ iv: iv, additionalData: associatedData.toString(), tagLength: AESGCMTagSize * 8 });
        }
        else {
            c.start({ iv: iv, tagLength: AESGCMTagSize * 8 });
        }
        c.update(util.createBuffer(plaintext));
        var success = c.finish();
        if (!success) {
            throw new Error("aesgcmaead: encryption failed");
        }
        var ciphertext = c.output.getBytes();
        var tag = c.mode.tag.getBytes();
        var ctBytes = Buffer.from(ciphertext, "binary");
        var ivBytes = Buffer.from(iv, "binary");
        var tagBytes = Buffer.from(tag, "binary");
        if (this.prependIV) {
            return Buffer.concat([ivBytes, tagBytes, ctBytes]);
        }
        else {
            return Buffer.concat([tagBytes, ctBytes]);
        }
    };
    /**
     *
     * @param ciphertext {Uint8Array | Buffer | ByteStringBuffer}
     * @param associatedData {Uint8Array | Buffer | ByteStringBuffer}
     * @returns {Uint8Array | Buffer}
     */
    AESGCMAEAD.prototype.decrypt = function (ciphertext, associatedData) {
        var iv = ciphertext.slice(0, AESGCMIVSize);
        if (iv.length !== AESGCMIVSize) {
            throw new Error("aesgcmaead: unexpected IV size: got ".concat(iv.length, ", want ").concat(AESGCMIVSize));
        }
        var tag = ciphertext.slice(AESGCMIVSize, AESGCMIVSize + AESGCMTagSize);
        if (tag.length !== AESGCMTagSize) {
            throw new Error("aesgcmaead: unexpected Tag size: got ".concat(tag.length, ", want ").concat(AESGCMTagSize));
        }
        var actualCiphertext;
        if (this.prependIV) {
            actualCiphertext = ciphertext.slice(AESGCMIVSize + AESGCMTagSize);
        }
        else {
            actualCiphertext = ciphertext.slice(AESGCMTagSize);
        }
        //const key = Buffer.from(this.key, 'binary')
        var d = cipher.createDecipher("AES-GCM", this.key);
        d.start({ iv: iv, additionalData: associatedData, tagLength: AESGCMTagSize * 8, tag: tag });
        d.update(util.createBuffer(actualCiphertext));
        var success = d.finish();
        if (!success) {
            throw new Error("aesgcmaead: decryption failed");
        }
        var plaintext = d.output.getBytes();
        return Buffer.from(plaintext, "binary");
    };
    return AESGCMAEAD;
}());
module.exports = {
    AESGCMAEAD: AESGCMAEAD,
    NewAESGCMAEAD: function (key, randomService) {
        return new AESGCMAEAD(key, randomService);
    },
    AESGCMIVSize: AESGCMIVSize,
    AESGCMTagSize: AESGCMTagSize
};
//# sourceMappingURL=aesgcmaead.js.map
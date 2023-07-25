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
var _a = require("node-forge"), cipher = _a.cipher, util = _a.util;
var AEAD = require("../types/types").AEAD;
var AESGCMIVSize = 12;
var AESGCMTagSize = 16;
var AESGCMAEAD = /** @class */ (function (_super) {
    __extends(AESGCMAEAD, _super);
    function AESGCMAEAD(key, randomService) {
        var _this = _super.call(this) || this;
        _this.randomService = randomService;
        _this.key = key;
        _this.prependIV = true;
        return _this;
    }
    AESGCMAEAD.prototype.validateAESKeySize = function (sizeInBytes) {
        if (sizeInBytes === 16 || sizeInBytes === 32) {
            return null;
        }
        else {
            throw new Error("aesgcmaead: invalid AES key size; want 16 or 32, got ".concat(sizeInBytes));
        }
    };
    AESGCMAEAD.prototype.encrypt = function (plaintext, associatedData) {
        var iv = this.randomService.getRandomBytes(AESGCMIVSize);
        //const tag = this.randomService.getRandomBytes(AESGCMTagSize);
        if (iv.length !== AESGCMIVSize) {
            throw new Error("aesgcmaead: unexpected IV size: got ".concat(iv.length, ", want ").concat(AESGCMIVSize));
        }
        var c = cipher.createCipher("AES-GCM", this.key);
        c.start({ iv: iv, additionalData: associatedData, tagLength: AESGCMTagSize * 8 });
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
}(AEAD));
module.exports = {
    AESGCMAEAD: AESGCMAEAD,
    NewAESGCMAEAD: function (key, randomService) {
        return new AESGCMAEAD(key, randomService);
    },
    AESGCMIVSize: AESGCMIVSize,
    AESGCMTagSize: AESGCMTagSize
};
//# sourceMappingURL=aesgcmaead.js.map
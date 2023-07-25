"use strict";
var XChaCha20Poly1305 = require("@stablelib/xchacha20poly1305").XChaCha20Poly1305;
var AEAD = require("../types/types").AEAD;
var CPRNGService = require("../services/cprngservice").CPRNGService;
/**
 * @class
 * @implements {AEAD}
 */
var XChaCha20Poly1305AEAD = /** @class */ (function () {
    /**
     *
     * @param key {any}
     * @param randomService {CPRNGService}
     */
    function XChaCha20Poly1305AEAD(key, randomService) {
        this.key = key;
        this.randomService = randomService;
    }
    /**
     *
     * @param sizeInBytes {number}
     */
    XChaCha20Poly1305AEAD.prototype.validateXChaChaKeySize = function (sizeInBytes) {
        if (sizeInBytes !== 32) {
            throw new Error("xchacha20poly1305: invalid XChaCha key size; want 32, got ".concat(sizeInBytes));
        }
    };
    /**
     *
     * @param plaintext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    XChaCha20Poly1305AEAD.prototype.encrypt = function (plaintext, associatedData) {
        this.validateXChaChaKeySize(this.key.length);
        var cipher = new XChaCha20Poly1305(this.key);
        var nonce = this.randomService.getRandomBytes(24);
        var ciphertext = cipher.seal(nonce, plaintext, associatedData);
        if (!ciphertext) {
            throw new Error("xchacha20poly1305: encryption failed");
        }
        return Buffer.concat([nonce, ciphertext]);
    };
    /**
     *
     * @param ciphertext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    XChaCha20Poly1305AEAD.prototype.decrypt = function (ciphertext, associatedData) {
        if (ciphertext.length < 40) {
            throw new Error("xchacha20poly1305: ciphertext too short");
        }
        this.validateXChaChaKeySize(this.key.length);
        var cipher = new XChaCha20Poly1305(this.key);
        var nonce = ciphertext.slice(0, 24);
        var ct = ciphertext.slice(24);
        var plaintext = cipher.open(nonce, ct, associatedData);
        if (!plaintext) {
            throw new Error("xchacha20poly1305: decryption failed");
        }
        return plaintext;
    };
    return XChaCha20Poly1305AEAD;
}());
module.exports = {
    XChaCha20Poly1305AEAD: XChaCha20Poly1305AEAD,
    NewXChaCha20Poly1305AEAD: function (key, randomService) {
        return new XChaCha20Poly1305AEAD(key, randomService);
    }
};
//# sourceMappingURL=xchacha20poly1305aead.js.map
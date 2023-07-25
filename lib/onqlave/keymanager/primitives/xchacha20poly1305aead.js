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
var XChaCha20Poly1305 = require("@stablelib/xchacha20poly1305").XChaCha20Poly1305;
var AEAD = require("../types/types").AEAD;
var XChaCha20Poly1305AEAD = /** @class */ (function (_super) {
    __extends(XChaCha20Poly1305AEAD, _super);
    function XChaCha20Poly1305AEAD(key, randomService) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.randomService = randomService;
        return _this;
    }
    XChaCha20Poly1305AEAD.prototype.validateXChaChaKeySize = function (sizeInBytes) {
        if (sizeInBytes !== 32) {
            throw new Error("xchacha20poly1305: invalid XChaCha key size; want 32, got ".concat(sizeInBytes));
        }
    };
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
}(AEAD));
module.exports = {
    XChaCha20Poly1305AEAD: XChaCha20Poly1305AEAD,
    NewXChaCha20Poly1305AEAD: function (key, randomService) {
        return new XChaCha20Poly1305AEAD(key, randomService);
    }
};
//# sourceMappingURL=xchacha20poly1305aead.js.map
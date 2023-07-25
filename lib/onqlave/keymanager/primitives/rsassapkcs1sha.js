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
var forge = require("node-forge");
var Unwrapping = require("../types/types").Unwrapping;
var crypto = require("crypto");
var RSASSAPKCS1SHA = /** @class */ (function (_super) {
    __extends(RSASSAPKCS1SHA, _super);
    function RSASSAPKCS1SHA(hashFunc, hashID, randomService) {
        var _this = _super.call(this) || this;
        _this.hashFunc = hashFunc;
        _this.randomService = randomService;
        _this.hashID = hashID;
        return _this;
    }
    RSASSAPKCS1SHA.prototype.unwrapKey = function (wdk, epk, fp, password) {
        var wdkDecoded = forge.util.decode64(wdk);
        var epkDecoded = forge.util.decode64(epk);
        var privateKey = forge.pki.decryptRsaPrivateKey(epkDecoded, password);
        if (!privateKey) {
            throw new Error("rsassapkcs1sha: invalid wrapping key format");
        }
        var decryptedKey = privateKey.decrypt(wdkDecoded, "RSA-OAEP", { md: this.hashFunc() });
        if (!decryptedKey) {
            throw new Error("rsassapkcs1sha: invalid key");
        }
        return decryptedKey;
    };
    return RSASSAPKCS1SHA;
}(Unwrapping));
module.exports = {
    RSASSAPKCS1SHA: RSASSAPKCS1SHA,
    NewRSASSAPKCS1SHA: function (hashFunc, hashID, randomService) {
        return new RSASSAPKCS1SHA(hashFunc, hashID, randomService);
    }
};
//# sourceMappingURL=rsassapkcs1sha.js.map
"use strict";
var forge = require("node-forge");
var Unwrapping = require("../types/types").Unwrapping;
/**
 * @class
 * @implements {Unwrapping}
 * @typedef {import('node-forge').Bytes} Bytes
 */
var RSASSAPKCS1SHA = /** @class */ (function () {
    function RSASSAPKCS1SHA(hashFunc, hashID, randomService) {
        this.hashFunc = hashFunc;
        this.randomService = randomService;
        this.hashID = hashID;
    }
    /**
     *
     * @param wdk {Uint8Array}
     * @param epk {Uint8Array}
     * @param fp {Uint8Array}
     * @param password {Uint8Array}
     * @returns {Uint8Array | Buffer | Bytes}
     *
     */
    RSASSAPKCS1SHA.prototype.unwrapKey = function (wdk, epk, fp, password) {
        var wdkDecoded = forge.util.decode64(wdk);
        var epkDecoded = forge.util.decode64(epk);
        var privateKey = forge.pki.decryptRsaPrivateKey(epkDecoded, password.toString());
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
}());
module.exports = {
    RSASSAPKCS1SHA: RSASSAPKCS1SHA,
    NewRSASSAPKCS1SHA: function (hashFunc, hashID, randomService) {
        return new RSASSAPKCS1SHA(hashFunc, hashID, randomService);
    }
};
//# sourceMappingURL=rsassapkcs1sha.js.map
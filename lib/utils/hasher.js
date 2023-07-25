"use strict";
var forge = require("node-forge");
var _a = require("../contracts/requests/requests"), EncryptionOpenRequest = _a.EncryptionOpenRequest, DecryptionOpenRequest = _a.DecryptionOpenRequest;
var Hasher = /** @class */ (function () {
    function Hasher() {
    }
    /**
     *
     * @param body {EncryptionOpenRequest | DecryptionOpenRequest}
     * @returns {string}
     */
    Hasher.prototype.digest = function (body) {
        var content = body.getContent();
        var digestHash = forge.md.sha512.create();
        digestHash.update(content);
        var sum = digestHash.digest().getBytes();
        return "SHA512=".concat(Buffer.from(sum, "binary").toString("base64"));
    };
    /**
     *
     * @param headers {Object.<string,string>}
     * @param signingKey {string}
     * @returns {string}
     */
    Hasher.prototype.sign = function (headers, signingKey) {
        var signatureHash = forge.hmac.create();
        signatureHash.start("sha512", signingKey);
        var keys = Object.keys(headers)
            .filter(function (hdrName) { return headers[hdrName] !== ""; })
            .sort();
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var hdrName = keys_1[_i];
            var input = "".concat(hdrName.toLowerCase(), ":").concat(headers[hdrName]);
            signatureHash.update(input);
        }
        var sum = signatureHash.digest().getBytes();
        return "HMAC-SHA512=".concat(Buffer.from(sum, "binary").toString("base64"));
    };
    return Hasher;
}());
module.exports = {
    Hasher: Hasher,
    NewHasher: function () {
        return new Hasher();
    },
};
//# sourceMappingURL=hasher.js.map
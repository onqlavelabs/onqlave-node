"use strict";
var Credential = /** @class */ (function () {
    function Credential(accessKey, signingKey, secretKey) {
        this.accessKey = accessKey;
        this.signingKey = signingKey;
        this.secretKey = secretKey;
    }
    Credential.prototype.valid = function () {
        if (!this.accessKey) {
            throw new Error("accessKey is not valid");
        }
        if (!this.secretKey) {
            throw new Error("secretKey is not valid");
        }
        if (!this.signingKey) {
            throw new Error("signingKey is not valid");
        }
        return null;
    };
    return Credential;
}());
module.exports = { Credential: Credential };
//# sourceMappingURL=credential.js.map
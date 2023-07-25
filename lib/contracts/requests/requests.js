"use strict";
var EncryptionOpenRequest = /** @class */ (function () {
    function EncryptionOpenRequest() {
    }
    EncryptionOpenRequest.prototype.getContent = function () {
        return JSON.stringify(this);
    };
    return EncryptionOpenRequest;
}());
var DecryptionOpenRequest = /** @class */ (function () {
    function DecryptionOpenRequest(encryptedDataKey) {
        this.encrypted_data_key = encryptedDataKey;
    }
    DecryptionOpenRequest.prototype.validate = function () {
        if (!this.encrypted_data_key || this.encrypted_data_key.length > 1500) {
            throw new Error("encrypted data key is required and must be at most 1500 characters");
        }
    };
    DecryptionOpenRequest.prototype.getContent = function () {
        this.validate();
        return JSON.stringify(this);
    };
    return DecryptionOpenRequest;
}());
module.exports = {
    EncryptionOpenRequest: EncryptionOpenRequest,
    DecryptionOpenRequest: DecryptionOpenRequest,
};
//# sourceMappingURL=requests.js.map
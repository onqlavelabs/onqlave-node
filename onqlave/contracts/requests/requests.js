class EncryptionOpenRequest {
    getContent() {
        return JSON.stringify(this);
    }
}

class DecryptionOpenRequest {
    constructor(encryptedDataKey) {
        this.encrypted_data_key = encryptedDataKey;
    }

    validate() {
        if (!this.encrypted_data_key || this.encrypted_data_key.length > 1500) {
            throw new Error('encrypted data key is required and must be at most 1500 characters');
        }
    }

    getContent() {
        this.validate();
        return JSON.stringify(this);
    }
}

module.exports = {
    EncryptionOpenRequest,
    DecryptionOpenRequest,
};

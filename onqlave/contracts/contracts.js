class EncryptionSecurityModel {
    constructor(algorithm, wrappingAlgorithm) {
        this.algorithm = algorithm;
        this.wrappingAlgorithm = wrappingAlgorithm;
    }

    validate() {
        if (!this.algorithm) {
            throw new Error('algorithm is required');
        }
        if (!this.wrappingAlgorithm) {
            throw new Error('wrapping algorithm is required');
        }
    }
}

class WrappingKey {
    constructor(encryptedPrivateKey, keyFingerprint) {
        this.encryptedPrivateKey = encryptedPrivateKey;
        this.keyFingerprint = keyFingerprint;
    }

    validate() {
        if (!this.encryptedPrivateKey) {
            throw new Error('encrypted private key is required');
        }
        if (!this.keyFingerprint) {
            throw new Error('key fingerprint is required');
        }
    }
}

class DataEncryptionKey {
    constructor(encryptedDataKey, wrappedDataKey) {
        this.encryptedDataKey = encryptedDataKey;
        this.wrappedDataKey = wrappedDataKey;
    }

    validate() {
        if (!this.encryptedDataKey) {
            throw new Error('encrypted data key is required');
        }
        if (!this.wrappedDataKey) {
            throw new Error('wrapped data key is required');
        }
    }
}

class DataDecryptionKey {
    constructor(wrappedDataKey) {
        this.wrappedDataKey = wrappedDataKey;
    }

    validate() {
        if (!this.wrappedDataKey) {
            throw new Error('wrapped data key is required');
        }
    }
}

module.exports =  {
    EncryptionSecurityModel,
    WrappingKey,
    DataEncryptionKey,
    DataDecryptionKey,
};

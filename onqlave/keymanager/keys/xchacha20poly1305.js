const {Key, KeyData} = require("../types/types");

/**
 * @class
 * @implements {Key}
 */
class XChaCha20Poly1305Key {
    /**
     *
     * @param keyID {number}
     * @param operation {KeyOperation}
     * @param data {AesGcmKeyData}
     */
    constructor(keyID, operation, data) {
        this.keyID = keyID;
        this.operation = operation;
        this.data = data;
    }

    /**
     *
     * @returns {number}
     */
    getKeyID() {
        return this.keyID;
    }

    /**
     *
     * @returns {KeyOperation}
     */
    getOperation() {
        return this.operation;
    }

    /**
     *
     * @returns {KeyData}
     */
    getData() {
        return this.data;
    }
}

/**
 * @class
 * @implements {KeyData}
 */
class XChaCha20Poly1305KeyData {
    constructor(value, keyMaterialType, version) {
        this.value = value;
        this.keyMaterialType = keyMaterialType;
        this.version = version;
    }

    fromValue() {
        return null;
    }

    /**
     *
     * @returns {Uint8Array | Buffer}
     */
    getValue() {
        return this.value;
    }

    getKeyMaterialType() {
        return this.keyMaterialType;
    }

    /**
     *
     * @returns {number}
     */
    getVersion() {
        return this.version;
    }
}

module.exports = {
    XChaCha20Poly1305Key,
    XChaCha20Poly1305KeyData,
    NewXChaCha20Poly1305Key: (id, operation, data) => {
        return new XChaCha20Poly1305Key(id, operation, data);
    }
};

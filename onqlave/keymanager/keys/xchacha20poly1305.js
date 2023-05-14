const { Key, KeyData } = require('../types/types')

class XChaCha20Poly1305Key extends Key {
    constructor(keyID, operation, data) {
        super();
        this.keyID = keyID
        this.operation = operation
        this.data = data
    }

    getKeyID() {
        return this.keyID
    }

    getOperation() {
        return this.operation
    }

    getData() {
        return this.data
    }
}

class XChaCha20Poly1305KeyData extends KeyData {
    constructor(value, keyMaterialType, version) {
        super();
        this.value = value
        this.keyMaterialType = keyMaterialType
        this.version = version
    }

    fromValue() {
        return null
    }

    getValue() {
        return this.value
    }

    getKeyMaterialType() {
        return this.keyMaterialType
    }

    getVersion() {
        return this.version
    }
}

module.exports =  {
    XChaCha20Poly1305Key,
    XChaCha20Poly1305KeyData,
    NewXChaCha20Poly1305Key: (id, operation, data) => {
        return new XChaCha20Poly1305Key(id, operation, data);
    }
}

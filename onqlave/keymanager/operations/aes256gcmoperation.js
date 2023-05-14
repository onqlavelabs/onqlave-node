const { KeyOperation, AESGCMKeyVersion, AesGcmKeyFormat } = require('../types/types')

class Aes256GcmKeyOperation extends KeyOperation {
    constructor(factory) {
        super();
        this.factory = factory;
        this.format = new AesGcmKeyFormat(32, AESGCMKeyVersion);
    }

    getFormat() {
        return this.format;
    }

    getFactory() {
        return this.factory;
    }
}

module.exports =  {
    Aes256GcmKeyOperation,
    NewAES256GCMKeyOperation: (factory) => {
        return new Aes256GcmKeyOperation(factory);
    },
};

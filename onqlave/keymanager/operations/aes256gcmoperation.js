const {KeyOperation, AESGCMKeyVersion, AesGcmKeyFormat, KeyFactory, KeyFormat} = require("../types/types");

/**
 * @class
 * @implements {KeyOperation}
 */
class Aes256GcmKeyOperation {
    /**
     *
     * @param factory {KeyFactory}
     */
    constructor(factory) {
        this.factory = factory;
        this.format = new AesGcmKeyFormat(32, AESGCMKeyVersion);
    }


    /**
     *
     * @returns {KeyFormat}
     */
    getFormat() {
        return this.format;
    }

    /**
     *
     * @returns {KeyFactory}
     */
    getFactory() {
        return this.factory;
    }
}

module.exports = {
    Aes256GcmKeyOperation,
    NewAES256GCMKeyOperation: (factory) => {
        return new Aes256GcmKeyOperation(factory);
    },
};

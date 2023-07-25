const {KeyOperation, XchaCha20Poly1305KeyVersion, XChaChaKeyFormat, KeyFormat, KeyFactory} = require("../types/types");

/**
 * @class
 * @implements {KeyOperation}
 */
class XChaCha20Poly1305KeyOperation {
    constructor(factory) {
        this.factory = factory;
        this.format = new XChaChaKeyFormat(32, XchaCha20Poly1305KeyVersion);
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
    XChaCha20Poly1305KeyOperation,
    NewXChaCha20Poly1305KeyOperation: (factory) => {
        return new XChaCha20Poly1305KeyOperation(factory);
    },
};

const { KeyOperation, AESGCMKeyVersion, AesGcmKeyFormat, KeyFactory, KeyFormat } = require("../types/types");

/**
 * @class
 * @implements {KeyOperation}
 */
class Aes128GcmKeyOperation {
	/**
	 *
	 * @param factory {KeyFactory}
	 */
	constructor(factory) {
		this.factory = factory;
		this.format = new AesGcmKeyFormat(16, AESGCMKeyVersion);
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

module.exports =  {
	Aes128GcmKeyOperation,
	NewAES128GCMKeyOperation: (factory) => {
		return new Aes128GcmKeyOperation(factory);
	},
};

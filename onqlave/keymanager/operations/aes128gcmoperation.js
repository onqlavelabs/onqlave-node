const { KeyOperation, AESGCMKeyVersion, AesGcmKeyFormat } = require("../types/types");

class Aes128GcmKeyOperation extends KeyOperation {
	constructor(factory) {
		super();
		this.factory = factory;
		this.format = new AesGcmKeyFormat(16, AESGCMKeyVersion);
	}

	getFormat() {
		return this.format;
	}

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

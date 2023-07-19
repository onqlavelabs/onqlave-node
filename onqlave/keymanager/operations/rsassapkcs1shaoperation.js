const { WrappingKeyOperation, RsaSsaPkcs1KeyFormat, RSASSAPKCS1KeyVersion, HashType } = require("../types/types");

class RSASSAPKCS1SHA2562048KeyOperation extends WrappingKeyOperation {
	constructor(factory) {
		super();
		this.factory = factory;
		this.format = new RsaSsaPkcs1KeyFormat(RSASSAPKCS1KeyVersion, HashType.SHA256);
	}

	getFormat() {
		return this.format;
	}

	getFactory() {
		return this.factory;
	}
}

module.exports = {
	RSASSAPKCS1SHA2562048KeyOperation,
	NewRSASSAPKCS1SHA2562048KeyOperation: (factory) => {
		return new RSASSAPKCS1SHA2562048KeyOperation(factory);
	},
};
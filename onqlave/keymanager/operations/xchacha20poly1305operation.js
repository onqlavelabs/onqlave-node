const { KeyOperation, XchaCha20Poly1305KeyVersion, XChaChaKeyFormat } = require("../types/types");

class XChaCha20Poly1305KeyOperation extends KeyOperation {
	constructor(factory) {
		super();
		this.factory = factory;
		this.format = new XChaChaKeyFormat(32, XchaCha20Poly1305KeyVersion);
	}

	getFormat() {
		return this.format;
	}

	getFactory() {
		return this.factory;
	}
}

module.exports =  {
	XChaCha20Poly1305KeyOperation, 
	NewXChaCha20Poly1305KeyOperation: (factory) => {
		return new XChaCha20Poly1305KeyOperation(factory);
	},
};

const {NewXChaCha20Poly1305AEAD} = require("../primitives/xchacha20poly1305aead");
const {KeyMaterialType, XchaCha20Poly1305KeyVersion, KeyFactory} = require("../types/types");
const {NewXChaCha20Poly1305Key, XChaCha20Poly1305KeyData} = require("../keys/xchacha20poly1305");

class XChaCha20Poly1305KeyFactory extends KeyFactory {
	constructor(idService, randomService) {
		super();
		this.idService = idService;
		this.randomService = randomService;
	}

	async newKey(operation) {
		const format = operation.getFormat();
		this.validateKeyFormat(format);
		const keyValue = this.randomService.getRandomBytes(format.size());
		const key = NewXChaCha20Poly1305Key(
			this.idService.newKeyID(),
			operation,
			new XChaCha20Poly1305KeyData(keyValue, KeyMaterialType.SYMMETRIC, XchaCha20Poly1305KeyVersion)
		);
		return Promise.resolve(key);
	}

	newKeyFromData(operation, keyData) {
		const format = operation.getFormat();
		this.validateKeyFormat(format);
		return NewXChaCha20Poly1305Key(
			this.idService.newKeyID(),
			operation,
			new XChaCha20Poly1305KeyData(keyData, KeyMaterialType.SYMMETRIC, XchaCha20Poly1305KeyVersion)
		);
	}

	async primitive(key) {
		const value = this.validateKey(key);
		const aead = NewXChaCha20Poly1305AEAD(value, this.randomService);
		if (!aead) {
			return Promise.reject(new Error("xchachapoly1305factory: cannot create new primitive"));
		}

		return Promise.resolve(aead);
	}

	validateKey(key) {
		const keyData = key.getData();
		this.validateKeyVersion(keyData.getVersion(), XchaCha20Poly1305KeyVersion);
		const value = keyData.getValue();
		if (!value) {
			throw new Error("xchachapoly1305factory: invalid key value");
		}
		const keySize = value.length;
		if (keySize !== 32) {
			throw new Error("xchachapoly1305factory: invalid key size");
		}
		return value;
	}

	validateKeyFormat(format) {
		if (format.size() !== 32) {
			throw new Error("xchachapoly1305factory: invalid key size");
		}
	}

	validateKeyVersion(version, maxExpected) {
		if (version > maxExpected) {
			throw new Error(`key has version ${version}; only keys with version in range [0..${maxExpected}] are supported`);
		}
	}
}

module.exports = {
	XChaCha20Poly1305KeyFactory,
	NewXChaCha20Poly1305KeyFactory: (idService, randomService) => {
		return new XChaCha20Poly1305KeyFactory(idService, randomService);
	}
};

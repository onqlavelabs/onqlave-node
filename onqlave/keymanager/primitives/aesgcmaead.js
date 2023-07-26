const { cipher , util } = require("node-forge");
const { AEAD } = require("../types/types");

const AESGCMIVSize = 12;
const AESGCMTagSize = 16;

class AESGCMAEAD extends AEAD {
	constructor(key, randomService) {
		super();
		this.randomService = randomService;
		this.key = key;
		this.prependIV = true;
	}

	validateAESKeySize(sizeInBytes) {
		if (sizeInBytes === 16 || sizeInBytes === 32) {
			return null;
		} else {
			throw new Error(`aesgcmaead: invalid AES key size; want 16 or 32, got ${sizeInBytes}`);
		}
	}

	encrypt(plaintext, associatedData) {
		const iv = this.randomService.getRandomBytes(AESGCMIVSize);
		//const tag = this.randomService.getRandomBytes(AESGCMTagSize);
		if (iv.length !== AESGCMIVSize) {
			throw new Error(`aesgcmaead: unexpected IV size: got ${iv.length}, want ${AESGCMIVSize}`);
		}
		const c = cipher.createCipher("AES-GCM", this.key);
		c.start({ iv: iv, additionalData: associatedData, tagLength: AESGCMTagSize * 8});
		c.update(util.createBuffer(plaintext));
		const success = c.finish();
		if (!success) {
			throw new Error("aesgcmaead: encryption failed");
		}
		const ciphertext = c.output.getBytes();
		const tag = c.mode.tag.getBytes();
		const ctBytes = Buffer.from(ciphertext, "binary");
		const ivBytes = Buffer.from(iv, "binary");
		const tagBytes = Buffer.from(tag, "binary");
		if (this.prependIV) {
			return Buffer.concat([ivBytes, tagBytes, ctBytes]);
		} else {
			return Buffer.concat([tagBytes, ctBytes]);
		}
	}

	decrypt(ciphertext, associatedData) {
		const iv = ciphertext.slice(0, AESGCMIVSize);
		if (iv.length !== AESGCMIVSize) {
			throw new Error(`aesgcmaead: unexpected IV size: got ${iv.length}, want ${AESGCMIVSize}`);
		}
		const tag = ciphertext.slice(AESGCMIVSize, AESGCMIVSize + AESGCMTagSize);
		if (tag.length !== AESGCMTagSize) {
			throw new Error(`aesgcmaead: unexpected Tag size: got ${tag.length}, want ${AESGCMTagSize}`);
		}
		let actualCiphertext;
		if (this.prependIV) {
			actualCiphertext = ciphertext.slice(AESGCMIVSize+AESGCMTagSize);
		} else {
			actualCiphertext = ciphertext.slice(AESGCMTagSize);
		}
		//const key = Buffer.from(this.key, 'binary')
		const d = cipher.createDecipher("AES-GCM", this.key);
		d.start({ iv: iv, additionalData: associatedData, tagLength: AESGCMTagSize * 8, tag: tag});
		d.update(util.createBuffer(actualCiphertext));
		const success = d.finish();

		if (!success) {
			throw new Error("aesgcmaead: decryption failed");
		}

		const plaintext = d.output.getBytes();
		return Buffer.from(plaintext, "binary");
	}
}

module.exports =  {
	AESGCMAEAD,
	NewAESGCMAEAD: (key, randomService) => {
		return new AESGCMAEAD(key, randomService);
	},
	AESGCMIVSize,
	AESGCMTagSize
};

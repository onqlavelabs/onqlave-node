const forge = require("node-forge");
const { Unwrapping } = require("../types/types");

/**
 * @class
 * @implements {Unwrapping}
 * @typedef {import('node-forge').Bytes} Bytes
 */
class RSASSAPKCS1SHA {
	constructor(hashFunc, hashID, randomService) {
		this.hashFunc = hashFunc;
		this.randomService = randomService;
		this.hashID = hashID;
	}

	/**
	 *
	 * @param wdk {Uint8Array}
	 * @param epk {Uint8Array}
	 * @param fp {Uint8Array}
	 * @param password {Uint8Array}
	 * @returns {Uint8Array | Buffer | Bytes}
	 *
	 */
	unwrapKey(wdk, epk, fp, password) {
		const wdkDecoded = forge.util.decode64(wdk);
		const epkDecoded = forge.util.decode64(epk);
		const privateKey = forge.pki.decryptRsaPrivateKey(epkDecoded, password.toString());
		if (!privateKey) {
			throw new Error("rsassapkcs1sha: invalid wrapping key format");
		}
		const decryptedKey = privateKey.decrypt(wdkDecoded, "RSA-OAEP", { md: this.hashFunc() });
		if (!decryptedKey) {
			throw new Error("rsassapkcs1sha: invalid key");
		}
		return decryptedKey;
	}
}

module.exports = {
	RSASSAPKCS1SHA,
	NewRSASSAPKCS1SHA: (hashFunc, hashID, randomService) => {
		return new RSASSAPKCS1SHA(hashFunc, hashID, randomService);
	}
};

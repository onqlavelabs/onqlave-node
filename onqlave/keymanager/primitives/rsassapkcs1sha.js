const forge = require("node-forge");
const { Unwrapping } = require("../types/types");

class RSASSAPKCS1SHA extends Unwrapping {
	constructor(hashFunc, hashID, randomService) {
		super();
		this.hashFunc = hashFunc;
		this.randomService = randomService;
		this.hashID = hashID;
	}

	unwrapKey(wdk, epk, fp, password) {
		const wdkDecoded = forge.util.decode64(wdk);
		const epkDecoded = forge.util.decode64(epk);
		const privateKey = forge.pki.decryptRsaPrivateKey(epkDecoded, password);
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

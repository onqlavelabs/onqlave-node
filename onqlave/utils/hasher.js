"use strict";

const forge = require("node-forge");

/**
 * @class
 * @typedef {import('../contracts/requests/requests').EncryptionOpenRequest} EncryptionOpenRequest
 * @typedef {import('../contracts/requests/requests').DecryptionOpenRequest} DecryptionOpenRequest
 */
class Hasher {
	constructor() { }

	/**
	 *
	 * @param body {EncryptionOpenRequest | DecryptionOpenRequest}
	 * @returns {string}
	 */
	digest(body) {
		const content = body.getContent();
		const digestHash = forge.md.sha512.create();
		digestHash.update(content);
		const sum = digestHash.digest().getBytes();
		return `SHA512=${Buffer.from(sum, "binary").toString("base64")}`;
	}

	/**
	 *
	 * @param headers {Object.<string, string | number | undefined>}
	 * @param signingKey {string}
	 * @returns {string}
	 */
	sign(headers, signingKey) {
		const signatureHash = forge.hmac.create();
		signatureHash.start("sha512", signingKey);

		const keys = Object.keys(headers)
			.filter((hdrName) => headers[hdrName] !== "")
			.sort();

		for (const hdrName of keys) {
			const input = `${hdrName.toLowerCase()}:${headers[hdrName]}`;
			signatureHash.update(input);
		}

		const sum = signatureHash.digest().getBytes();
		return `HMAC-SHA512=${Buffer.from(sum, "binary").toString("base64")}`;
	}
}

module.exports = {
	Hasher,
};

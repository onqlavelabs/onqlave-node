/**
 * @class
 */
class Credential {
	/**
     *
     * @param accessKey {string}
     * @param signingKey {string}
     * @param secretKey {string}
     */
	constructor(accessKey, signingKey, secretKey) {
		/**
         *
         * @type {string}
         */
		this.accessKey = accessKey;
		/**
         *
         * @type {string}
         */
		this.signingKey = signingKey;
		/**
         *
         * @type {string}
         */
		this.secretKey = secretKey;
	}

	valid() {
		if (!this.accessKey) {
			throw new Error("accessKey is not valid");
		}
		if (!this.secretKey) {
			throw new Error("secretKey is not valid");
		}
		if (!this.signingKey) {
			throw new Error("signingKey is not valid");
		}
		return null;
	}
}

module.exports = {
	Credential
};
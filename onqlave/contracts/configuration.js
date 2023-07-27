/**
 * @class
 * @typedef {import('./credential').Credential} Credential
 * @typedef {import('./retrysettings').RetrySettings} RetrySettings
 */
class Configuration {
	/**
     *
     * @param credential {Credential}
     * @param retrySettings {RetrySettings}
     * @param arxURL {string}
     * @param debug {boolean}
     */
	constructor(credential, retrySettings, arxURL, debug) {
		this.credential = credential;
		this.retrySettings = retrySettings;
		this.debug = debug;
		this.extractArxURL(arxURL);

	}

	/**
	 *
	 * @param arxURL {string}
	 */
	extractArxURL(arxURL) {
		const index = arxURL.lastIndexOf("/");
		/**
		 *
		 * @type {string}
		 */
		this.arxUrl = arxURL.substring(0, index);
		/**
		 *
		 * @type {string}
		 */
		this.arxId = arxURL.substring(index + 1);
	}
}

/**
 *
 * @type {string}
 */
const INVALID_ARX = "invalid_arx";
module.exports = {
	Configuration, INVALID_ARX,
};
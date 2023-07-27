const axios = require("axios");
const axiosRetry = require("axios-retry");
const {performance} = require("perf_hooks");
const {RetrySettings} = require("../contracts/retrysettings");


/**
 * @class
 * @typedef {import('../contracts/retrysettings').RetrySettings} RetrySettings
 * @typedef {import('../contracts/requests/requests').EncryptionOpenRequest} EncryptionOpenRequest
 * @typedef {import('../contracts/requests/requests').DecryptionOpenRequest} DecryptionOpenRequest
 */
class Client {
	/**
	 *
	 * @param retrySettings {RetrySettings}
	 * @param logger
	 */
	constructor(retrySettings, logger) {
		this.retrySettings = retrySettings;
		this.logger = logger;
	}

	/**
	 *
	 * @param resource {string}
	 * @param body {EncryptionOpenRequest | DecryptionOpenRequest}
	 * @param headers {Object.<string, string>}
	 * @returns {Promise<any>}
	 */
	async post(resource, body, headers) {
		const operation = "Http";
		this.logger.debug(`[onqlave] SDK: ${operation} - Http operation started`);
		const start = performance.now();

		axiosRetry(axios, {
			retries: this.retrySettings.maxRetries, retryDelay: (retryCount) => {
				return retryCount * this.retrySettings.waitTime;
			}
		});
		const response = await axios.post(resource, body, {headers});
		this.logger.debug(`[onqlave] SDK: ${operation} - Http operation finished successfully: operation took ${performance.now() - start} ms`);
		return response.data;
	}
}

module.exports = {
	Client,
};

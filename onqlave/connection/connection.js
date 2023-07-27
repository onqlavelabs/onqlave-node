const {Client} = require("./client");
const {OnqlaveError, ErrorCodes} = require("../errors/errors");
const {performance} = require("perf_hooks");

/**
 * @class
 * @typedef {import('../utils/hasher').Hasher} Hasher
 * @typedef {import('../contracts/configuration').Configuration} Configuration
 * @typedef {import('../contracts/requests/requests').EncryptionOpenRequest} EncryptionOpenRequest
 * @typedef {import('../contracts/requests/requests').DecryptionOpenRequest} DecryptionOpenRequest
 */
class Connection {
	/**
	 *
	 * @param configuration {Configuration}
	 * @param hasher {Hasher}
	 * @param logger
	 */
	constructor(configuration, hasher, logger) {
		this.client = new Client(configuration.retrySettings, logger);
		this.hasher = hasher;
		this.logger = logger;
		this.configuration = configuration;
	}

	/**
	 *
	 * @param resource {string}
	 * @param body {EncryptionOpenRequest | DecryptionOpenRequest}
	 * @returns {Promise<any>}
	 */
	async post(resource, body) {
		const operation = "Post";
		const start = performance.now();
		this.logger.debug(`[onqlave] SDK: ${operation} - Sending request started`);
		const urlString = `${this.configuration.arxUrl}/${resource}`;
		const arxId = this.configuration.arxId;
		const now = Math.floor(Date.now() / 1000);
		const content = JSON.stringify(body);
		const contentLen = content.length;
		const digest = await this.hasher.digest(body);
		const headersToSign = {
			"ONQLAVE-API-KEY": this.configuration.credential.accessKey,
			"ONQLAVE-ARX": arxId,
			"ONQLAVE-HOST": this.configuration.arxUrl,
			"User-Agent": "Onqlave/0.1",
			"ONQLAVE-CONTEXT-LEN": contentLen,
			"ONQLAVE-DIGEST": digest,
			"ONQLAVE-VERSION": "0.1",
		};
		const signature = await this.hasher.sign(headersToSign, this.configuration.credential.signingKey);
		const headers = {
			"Content-Type": "application/json",
			"ONQLAVE-API-KEY": this.configuration.credential.accessKey,
			"ONQLAVE-ARX": arxId,
			"ONQLAVE-HOST": this.configuration.arxUrl,
			"User-Agent": "Onqlave/0.1",
			"ONQLAVE-CONTEXT-LEN": contentLen,
			"ONQLAVE-DIGEST": digest,
			"ONQLAVE-VERSION": "0.1",
			"ONQLAVE-REQUEST-TIME": now,
			"ONQLAVE-SIGNATURE": signature,
		};

		try {
			const response = await this.client.post(urlString, body, headers);
			this.logger.debug(`[onqlave] SDK: ${operation} - Sending request finished successfully: operation took ${performance.now() - start} ms`);
			return response;
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error, `[onqlave] SDK: ${operation} - Failed sending request`);
		}
	}
}

module.exports = {
	Connection,
};

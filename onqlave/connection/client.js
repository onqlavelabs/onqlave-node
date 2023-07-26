const axios = require("axios");
const axiosRetry = require("axios-retry");
const { performance } = require("perf_hooks");
const {RetrySettings} = require("../contracts/retrysettings");


class Client {
	constructor(retrySettings = new RetrySettings(), logger = console) {
		this.retrySettings = retrySettings;
		this.logger = logger;
	}

	async post(resource, body, headers) {
		const operation = "Http";
		this.logger.info(`[onqlave] SDK: ${operation} - Http operation started`);
		const start = performance.now();

		try {
			axiosRetry(axios, {
				retries: this.retrySettings.maxRetries, retryDelay: (retryCount) => {
					return retryCount * this.retrySettings.waitTime;
				}
			});
			const response = await axios.post(resource, body, { headers });
			this.logger.info(`[onqlave] SDK: ${operation} - Http operation finished successfully: operation took ${performance.now() - start} ms`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = {
	Client,
	NewClient: (retrySettings = new RetrySettings(), logger = console) => {
		return new Client(retrySettings, logger);
	}
};

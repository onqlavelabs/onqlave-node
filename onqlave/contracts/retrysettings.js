class RetrySettings {
	/**
	 *
	 * @param maxRetries {number}
	 * @param waitTime {number}
	 * @param maxWaitTime {number}
	 */
	constructor(maxRetries, waitTime, maxWaitTime) {
		/**
		 *
		 * @type {number}
		 */
		this.maxRetries = maxRetries;
		/**
		 *
		 * @type {number}
		 */
		this.waitTime = waitTime;
		/**
		 *
		 * @type {number}
		 */
		this.maxWaitTime = maxWaitTime;
	}
	valid() {
		if (this.maxRetries <= 0) {
			throw new Error("invalid retry count");
		}
		if (this.waitTime <= 0) {
			throw new Error("invalid wait time");
		}
		return null;
	}
}

module.exports = {
	RetrySettings
};
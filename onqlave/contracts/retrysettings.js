class RetrySettings {
    constructor(maxRetries, waitTime, maxWaitTime) {
        this.maxRetries = maxRetries;
        this.waitTime = waitTime;
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
}
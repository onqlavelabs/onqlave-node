class CredentialOption {
	constructor(credential) {
		this.credential = credential;
	}

	apply(configuration) {
		configuration.credential = this.credential;
	}
}

class RetryOption {
	constructor(retry) {
		this.retry = retry;
	}

	apply(configuration) {
		configuration.retry = this.retry;
	}
}

class ArxOption {
	constructor(arxURL) {
		this.arxURL = arxURL;
	}

	apply(configuration) {
		configuration.arxURL = this.arxURL;
	}
}

function withCredential(credential) {
	return new CredentialOption(credential);
}

function withRetry(retry) {
	return new RetryOption(retry);
}

function withArx(arxURL) {
	return new ArxOption(arxURL);
}

const INVALID_ARX = "invalid_arx";

module.exports =  {
	withCredential,
	withRetry,
	withArx,
	INVALID_ARX
};

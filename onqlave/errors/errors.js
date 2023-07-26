class OnqlaveError extends Error {
	constructor(code, message, originalError = null) {
		super(message);
		this.code = code;
		this.originalError = originalError;
	}

	static newOnqlaveErrorf(code, format, ...args) {
		const message = format.replace(/%s/g, () => args.shift());
		return new OnqlaveError(code, message);
	}

	static newOnqlaveErrorWrap(code, err, message) {
		return new OnqlaveError(code, message, err);
	}

	static newOnqlaveErrorWrapf(code, err, format, ...args) {
		const message = format.replace(/%s/g, () => args.shift());
		return new OnqlaveError(code, message, err);
	}

	getOriginalError() {
		return this.originalError;
	}

	getMessage() {
		return `Message: ${this.message}`;
	}

	getCode() {
		return `Code: ${this.code}`;
	}
}

const ErrorCodes = {
	Server: "Server",
	InvalidInput: "InvalidInput",
	SdkErrorCode: "400",
};

module.exports =  {
	OnqlaveError,
	ErrorCodes,
};

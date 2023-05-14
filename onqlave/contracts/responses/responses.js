class BaseErrorResponse {
    constructor({ error }) {
        this.error = error;
    }
}

class BaseError {
    constructor({ status, message, correlationId, details, code }) {
        this.status = status;
        this.message = message;
        this.correlationId = correlationId;
        this.details = details;
        this.code = code;
    }
}

class DecryptionOpenResponse extends BaseErrorResponse {
    constructor({ wrappingKey, securityModel, dataKey, error }) {
        super({ error });
        this.wrappingKey = wrappingKey;
        this.securityModel = securityModel;
        this.dataKey = dataKey;
    }
}

class EncryptionOpenResponse extends BaseErrorResponse {
    constructor({ wrappingKey, dataKey, securityModel, error, maxUses }) {
        super({ error });
        this.wrappingKey = wrappingKey;
        this.dataKey = dataKey;
        this.securityModel = securityModel;
        this.maxUses = maxUses;
    }
}

module.exports = {
    BaseErrorResponse,
    BaseError,
    DecryptionOpenResponse,
    EncryptionOpenResponse,
};

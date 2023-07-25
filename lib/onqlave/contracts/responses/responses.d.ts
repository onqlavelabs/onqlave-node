export class BaseErrorResponse {
    constructor({ error }: {
        error: any;
    });
    error: any;
}
export class BaseError {
    constructor({ status, message, correlationId, details, code }: {
        status: any;
        message: any;
        correlationId: any;
        details: any;
        code: any;
    });
    status: any;
    message: any;
    correlationId: any;
    details: any;
    code: any;
}
export class DecryptionOpenResponse extends BaseErrorResponse {
    constructor({ wrappingKey, securityModel, dataKey, error }: {
        wrappingKey: any;
        securityModel: any;
        dataKey: any;
        error: any;
    });
    wrappingKey: any;
    securityModel: any;
    dataKey: any;
}
export class EncryptionOpenResponse extends BaseErrorResponse {
    constructor({ wrappingKey, dataKey, securityModel, error, maxUses }: {
        wrappingKey: any;
        dataKey: any;
        securityModel: any;
        error: any;
        maxUses: any;
    });
    wrappingKey: any;
    dataKey: any;
    securityModel: any;
    maxUses: any;
}

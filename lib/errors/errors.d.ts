export class OnqlaveError extends Error {
    static newOnqlaveErrorf(code: any, format: any, ...args: any[]): OnqlaveError;
    static newOnqlaveErrorWrap(code: any, err: any, message: any): OnqlaveError;
    static newOnqlaveErrorWrapf(code: any, err: any, format: any, ...args: any[]): OnqlaveError;
    constructor(code: any, message: any, originalError?: null);
    code: any;
    originalError: any;
    getOriginalError(): any;
    getMessage(): string;
    getCode(): string;
}
export namespace ErrorCodes {
    let Server: string;
    let InvalidInput: string;
    let SdkErrorCode: string;
}

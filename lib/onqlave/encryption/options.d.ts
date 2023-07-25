export function withCredential(credential: any): CredentialOption;
export function withRetry(retry: any): RetryOption;
export function withArx(arxURL: any): ArxOption;
export const INVALID_ARX: "invalid_arx";
declare class CredentialOption {
    constructor(credential: any);
    credential: any;
    apply(configuration: any): void;
}
declare class RetryOption {
    constructor(retry: any);
    retry: any;
    apply(configuration: any): void;
}
declare class ArxOption {
    constructor(arxURL: any);
    arxURL: any;
    apply(configuration: any): void;
}
export {};

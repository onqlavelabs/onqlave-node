export class EncryptionOpenRequest {
    getContent(): string;
}
export class DecryptionOpenRequest {
    constructor(encryptedDataKey: any);
    encrypted_data_key: any;
    validate(): void;
    getContent(): string;
}

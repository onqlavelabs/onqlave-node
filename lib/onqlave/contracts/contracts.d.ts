export class EncryptionSecurityModel {
    constructor(algorithm: any, wrappingAlgorithm: any);
    algorithm: any;
    wrappingAlgorithm: any;
    validate(): void;
}
export class WrappingKey {
    constructor(encryptedPrivateKey: any, keyFingerprint: any);
    encryptedPrivateKey: any;
    keyFingerprint: any;
    validate(): void;
}
export class DataEncryptionKey {
    constructor(encryptedDataKey: any, wrappedDataKey: any);
    encryptedDataKey: any;
    wrappedDataKey: any;
    validate(): void;
}
export class DataDecryptionKey {
    constructor(wrappedDataKey: any);
    wrappedDataKey: any;
    validate(): void;
}

class Credential {
    constructor(accessKey, signingKey, secretKey) {
        this.accessKey = accessKey;
        this.signingKey = signingKey;
        this.secretKey = secretKey;
    }

    valid() {
        if (!this.accessKey) {
            throw new Error("accessKey is not valid");
        }
        if (!this.secretKey) {
            throw new Error("secretKey is not valid");
        }
        if (!this.signingKey) {
            throw new Error("signingKey is not valid");
        }
        return null;
    }
}

module.exports = {
    Credential
}
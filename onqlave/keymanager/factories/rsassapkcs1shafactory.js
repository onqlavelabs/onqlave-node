'use strict'

const forge = require( 'node-forge')
const { getHashes } = require( 'crypto')
const { NewRSASSAPKCS1SHA } = require( '../primitives/rsassapkcs1sha')
const { WrappingKeyFactory, HashTypeName } = require( '../types/types')

class RSASSAPKCS1SHAKeyFactory extends WrappingKeyFactory {
    constructor(randomService) {
        super();
        this.randomService = randomService;
    }

    async primitive(operation) {
        const format = operation.getFormat();
        const rsaSsaPkcs1KeyFormat = format;
        const hashName = HashTypeName[rsaSsaPkcs1KeyFormat.hash];
        const hashID = await this.hashID(hashName);
        const hashFunc = this.rsaHashFunc(hashID);
        const ret = NewRSASSAPKCS1SHA(hashFunc, hashID, this.randomService);
        if (!ret) {
            throw new Error(`rsassakeyfactory: cannot create new primitive`);
        }
        return Promise.resolve(ret);
    }

    async hashID(hashAlg) {
        switch (hashAlg) {
            case "SHA256":
                return getHashes().includes('sha256') ? 'sha256' : undefined;
            case "SHA384":
                return getHashes().includes('sha384') ? 'sha384' : undefined;
            case "SHA512":
                return getHashes().includes('sha512') ? 'sha512' : undefined;
            default:
                throw new Error(`invalid hash function: ${hashAlg}`);
        }
    }

    rsaHashFunc(hashAlg) {
        if (this.hashSafeForSignature(hashAlg)) {
            const m = forge.md[hashAlg].create();
            return () => m;
        } else {
            throw new Error(`hash function not safe for digital signatures: ${hashAlg}`);
        }
    }

    hashSafeForSignature(hashAlg) {
        switch (hashAlg) {
            case "sha256":
            case "sha384":
            case "sha512":
                return true;
            default:
                return false;
        }
    }
}

module.exports =  {
    RSASSAPKCS1SHAKeyFactory,
    NewRSASSAPKCS1SHAKeyFactory: (randomService) => {
        return new RSASSAPKCS1SHAKeyFactory(randomService);
    }
};

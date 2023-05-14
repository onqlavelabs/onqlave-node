const { KeyFactory, KeyMaterialType, AESGCMKeyVersion } = require('../types/types')
const { NewAESGCMAEAD } = require('../primitives/aesgcmaead')
const { AesGcmKeyData, NewAesGcmKey } = require('../keys/aesgcm')

class AesGcmKeyFactory extends KeyFactory {
    constructor(idService, randomService) {
        super();
        this.idService = idService;
        this.randomService = randomService;
    }

    async newKey(operation) {
        const format = operation.getFormat();
        this.validateKeyFormat(format);
        const keyValue = this.randomService.getRandomBytes(format.size());
        const key = NewAesGcmKey(
            this.idService.newKeyID(),
            operation,
            new AesGcmKeyData(keyValue, KeyMaterialType.SYMMETRIC, AESGCMKeyVersion)
        );
        return Promise.resolve(key);
    }

    async newKeyFromData(operation, keyData) {
        const format = operation.getFormat();
        this.validateKeyFormat(format);
        const key = NewAesGcmKey(
            this.idService.newKeyID(),
            operation,
            new AesGcmKeyData(keyData, KeyMaterialType.SYMMETRIC, AESGCMKeyVersion)
        );
        return Promise.resolve(key);
    }

    async primitive(key) {
        const value = this.validateKey(key);
        const aead = NewAESGCMAEAD(value, this.randomService);
        return Promise.resolve(aead);
    }

    validateKey(key) {
        const keyData = key.getData();
        this.validateKeyVersion(keyData.getVersion(), AESGCMKeyVersion);
        const value = keyData.getValue();
        if (!value) {
            throw new Error(`aesgcmfactory: invalid key value`);
        }
        const keySize = value.length;
        if (keySize !== 16 && keySize !== 32) {
            throw new Error('aesgcmfactory: invalid key size');
        }
        return value;
    }

    validateKeyVersion(version, maxExpected) {
        if (version > maxExpected) {
            throw new Error('aesgcmfactory: invalid key version');
        }
    }

    validateKeyFormat(format) {
        const keySize = format.size();
        if (keySize !== 16 && keySize !== 32) {
            throw new Error('aesgcmfactory: invalid key format');
        }
    }
}


module.exports =  {
    AesGcmKeyFactory,
    NewAEADGCMKeyFactory: (idService, randomService) => {
        return new AesGcmKeyFactory(idService, randomService)
    }
};

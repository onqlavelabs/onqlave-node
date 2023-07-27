const {Encryption, Credential, RetrySettings} = require('@onqlavelabs/onqlave-node');
const {createReadStream, createWriteStream} = require('fs');
const config = require('CHANGE_YOUR_CONFIGURATION.json');

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function main() {
    const credential = new Credential(config.accessKey, config.signingKey, config.secretKey);
    const retrySettings = new RetrySettings(config.maxRetries, config.waitTime, config.maxWaitTime);
    const encryptionService = new Encryption(credential, retrySettings, config.arxURL, config.debug);
    try {
        await encryption_cycle_file(encryptionService);
        await delay(200);
        await encryption_cycle_plain(encryptionService);
        await delay(200);
    } catch (error) {
        console.log(error);
    }
}

async function encryption_cycle_plain(encryptionService) {
    const plainData = Buffer.from("This is the plain data");
    const additionalData = Buffer.from("This is to authenticated not to encrypt");
    const cipherData = await encryptionService.encrypt(plainData, additionalData);
    const originalData = await encryptionService.decrypt(cipherData, additionalData);
    console.log(originalData.toString());
}

async function encryption_cycle_file(encryptionService) {
    const plainStream = createReadStream('./data.in', {highWaterMark: 64 * 1024});
    const cipherStream = createWriteStream('./data.o', {encoding: 'binary'});
    const additionalData = Buffer.from("This is to authenticated not to encrypt");
    await encryptionService.encryptStream(plainStream, cipherStream, additionalData);
    plainStream.close();
    cipherStream.close();
    const plainStream1 = createWriteStream('./dataout.in', {encoding: 'binary'});
    const cipherStream1 = createReadStream('./data.o', {highWaterMark: 64 * 1024});
    await encryptionService.decryptStream(cipherStream1, plainStream1, additionalData);
    plainStream1.close();
    cipherStream1.close();
}

main()
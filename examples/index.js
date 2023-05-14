const { Encryption, withCredential, withRetry, withArx, Credential, RetrySettings } = require('onqlave-node');
const { createReadStream, createWriteStream } = require('fs');

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function main() {
    const arxUrl = "<arx_url>"; //This is the Arx URL retruned of the API Key created during setup. Keep in in a safe place.
    const apiKey = "<api_access_key>"       //This is the API Access Key returned of the API Key created during setup. Keep in in a safe place.
    const signingKey = "<api_signing_key>"  //This is the API Signing Key retruned of the API Key created during setup. Keep in in a safe place.
    const secretKey = "<api_secret_key>"    //This is the API Secret Key retruned of the API Key created during setup. Keep in in a safe place.

    const arxOption = withArx(arxUrl);
    const credentialOption = withCredential(new Credential(apiKey, signingKey, secretKey));
    const retryOption = withRetry(new RetrySettings());

    try {
        await encryption_cycle_file(arxOption, credentialOption, retryOption);
        await delay(200);
        await encryption_cycle_plain(arxOption, credentialOption, retryOption);
        await delay(200);
    } catch (error) {
        console.log(error);
    }
}

async function encryption_cycle_plain(arxOption, credentialOption, retryOption) {
    const service = new Encryption(arxOption, credentialOption, retryOption);
    const plainData = Buffer.from("This is the plain data");
    const additionalData = Buffer.from("This is to authenticated not to encrypt");
    const cipherData = await service.encrypt(plainData, additionalData);
    const originalData = await service.decrypt(cipherData, additionalData);
    console.log(originalData.toString());
}

async function encryption_cycle_file(arxOption, credentialOption, retryOption) {
    const service = new Encryption(arxOption, credentialOption, retryOption);
    const plainStream = createReadStream('./data.in', { highWaterMark: 64 * 1024 });
    const cipherStream = createWriteStream('./data.o', { encoding: 'binary' });
    const additionalData = Buffer.from("This is to authenticated not to encrypt");
    await service.encryptStream(plainStream, cipherStream, additionalData);
    plainStream.close();
    cipherStream.close();
    const plainStream1 = createWriteStream('./dataout.in', { encoding: 'binary' });
    const cipherStream1 = createReadStream('./data.o', { highWaterMark: 64 * 1024 });
    await service.decryptStream(cipherStream1, plainStream1, additionalData);
    plainStream1.close();
    cipherStream1.close();
}

main()
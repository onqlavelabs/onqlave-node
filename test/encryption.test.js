// import class TestEncryption
const TestEncryption = require('./TestEncryption');
// jest test
describe('Encryption Test', () => {
    const itif = (condition) => condition ? it : it.skip;

    // @ts-ignore
    let aes_128 = new TestEncryption(
        process.env.AES_128_ACCESS_KEY,
        process.env.AES_128_ARX_URL,
        process.env.AES_128_SIGNING_KEY,
        process.env.AES_128_SECRET_KEY
    );

    let aes_256 = new TestEncryption(
        process.env.AES_256_ACCESS_KEY,
        process.env.AES_256_ARX_URL,
        process.env.AES_256_SIGNING_KEY,
        process.env.AES_256_SECRET_KEY
    );

    let xchacha = new TestEncryption(
        process.env.XCHACHA_ACCESS_KEY,
        process.env.XCHACHA_ARX_URL,
        process.env.XCHACHA_SIGNING_KEY,
        process.env.XCHACHA_SECRET_KEY
    );

    itif(aes_128.isCreated())('AES-128 encryption', async () => {
        // @ts-ignore
        await aes_128.doTest();
    });

    itif(aes_256.isCreated())('AES-256 encryption', async () => {
        // @ts-ignore
        await aes_256.doTest();
    });

    itif(xchacha.isCreated())('XCHACHA encryption', async () => {
        // @ts-ignore
        await xchacha.doTest();
    });
    
});

const {Encryption, Credential, RetrySettings} = require('../onqlave/index');
const fs = require('fs');

// jest test
describe('Encryption Test', () => {
    
    it('AES-128 encryption', async () => {
        const accessKey = process.env.AES_128_ACCESS_KEY;
        const arxURL = process.env.AES_128_ARX_URL;
        const signingKey = process.env.AES_128_SIGNING_KEY;
        const secretKey = process.env.AES_128_SECRET_KEY;

        // @ts-ignore
        await new TestEncryption(accessKey, arxURL, signingKey, secretKey).doTest();
    });

    it('AES-256 encryption', async () => {
        const accessKey = process.env.AES_256_ACCESS_KEY;
        const arxURL = process.env.AES_256_ARX_URL;
        const signingKey = process.env.AES_256_SIGNING_KEY;
        const secretKey = process.env.AES_256_SECRET_KEY;

        // @ts-ignore
        await new TestEncryption(accessKey, arxURL, signingKey, secretKey).doTest();
    });

    it('XCHACHA encryption', async () => {
        const accessKey = process.env.XCHACHA_ACCESS_KEY;
        const arxURL = process.env.XCHACHA_ARX_URL;
        const signingKey = process.env.XCHACHA_SIGNING_KEY;
        const secretKey = process.env.XCHACHA_SECRET_KEY;
        
        // @ts-ignore
        await new TestEncryption(accessKey, arxURL, signingKey, secretKey).doTest();
    });
    
    class TestEncryption {
        // Constructor
        /**
         * @param {string | null} accessKey
         * @param {string | null} arxURL
         * @param {string | null} signingKey
         * @param {string | null} secretKey
         */
        constructor(accessKey, arxURL, signingKey, secretKey) {
            this.encryption = this.createEncryption(accessKey, signingKey, secretKey, arxURL);
        }

        async doTest() {
            await this.compareEncryptedDecryptedText();
            await this.compareEncryptedDecryptedStream();
        }
    
        /**
         * @param {string | null} accessKey
         * @param {string | null} signingKey
         * @param {string | null} secretKey
         * @param {string | null} arxURL
         */
        createEncryption(accessKey, signingKey, secretKey, arxURL) {
            if (accessKey == null || signingKey == null || secretKey == null || arxURL == null) {
                throw new Error("Missing environment variables");
            }
            const credential = new Credential(accessKey, signingKey, secretKey);
            const retry = new RetrySettings(1, 1, 2);
            return new Encryption(credential, retry, arxURL, false);
        }

        async compareEncryptedDecryptedText() {
            const plainData = Buffer.from("This is the plain data");
            const additionalData = Buffer.from("This is to authenticated not to encrypt");
            const cipherData = await this.encryption.encrypt(plainData, additionalData);
            const decryptedData = await this.encryption.decrypt(cipherData, additionalData);
            const decryptedText = decryptedData.toString();
            expect(decryptedText).toBe(decryptedText);
        }

        async compareEncryptedDecryptedStream() {
            const plainData = Buffer.from("This is the plain data");
            const additionalData = Buffer.from("This is to authenticated not to encrypt");
            
            // prepare sample data
            fs.writeFile('plaintext.txt', plainData, (err) => {
                if (err) throw err;
            })

            // read stream from file
            const plainStream = fs.createReadStream('plaintext.txt');
            const cipherWriteStream = fs.createWriteStream('ciphertext.txt');
            await this.encryption.encryptStream(plainStream, cipherWriteStream, additionalData);
            plainStream.close();
            cipherWriteStream.close();
            
            // read stream from file
            const cipherReadStream = fs.createReadStream('ciphertext.txt');
            const decryptedSteam = fs.createWriteStream('decrypted.txt');
            await this.encryption.decryptStream(cipherReadStream, decryptedSteam, additionalData);
            cipherReadStream.close();
            decryptedSteam.close();

            expect(fs.readFileSync('decrypted.txt', 'utf8')).toBe(fs.readFileSync('plaintext.txt', 'utf8'));

            // delete files
            fs.unlinkSync('plaintext.txt');
            fs.unlinkSync('ciphertext.txt');
            fs.unlinkSync('decrypted.txt');
        }
    }
});

const {XChaCha20Poly1305} = require("@stablelib/xchacha20poly1305");
const {AEAD} = require("../types/types");
const {CPRNGService} = require("../services/cprngservice")

/**
 * @class
 * @implements {AEAD}
 */
class XChaCha20Poly1305AEAD {
    /**
     *
     * @param key {any}
     * @param randomService {CPRNGService}
     */
    constructor(key, randomService) {
        this.key = key;
        this.randomService = randomService;
    }

    /**
     *
     * @param sizeInBytes {number}
     */
    validateXChaChaKeySize(sizeInBytes) {
        if (sizeInBytes !== 32) {
            throw new Error(`xchacha20poly1305: invalid XChaCha key size; want 32, got ${sizeInBytes}`);
        }
    }

    /**
     *
     * @param plaintext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    encrypt(plaintext, associatedData) {
        this.validateXChaChaKeySize(this.key.length);
        const cipher = new XChaCha20Poly1305(this.key);
        const nonce = this.randomService.getRandomBytes(24);
        const ciphertext = cipher.seal(nonce, plaintext, associatedData);
        if (!ciphertext) {
            throw new Error("xchacha20poly1305: encryption failed");
        }
        return Buffer.concat([nonce, ciphertext]);
    }

    /**
     *
     * @param ciphertext {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Uint8Array | Buffer}
     */
    decrypt(ciphertext, associatedData) {
        if (ciphertext.length < 40) {
            throw new Error("xchacha20poly1305: ciphertext too short");
        }
        this.validateXChaChaKeySize(this.key.length);
        const cipher = new XChaCha20Poly1305(this.key);
        const nonce = ciphertext.slice(0, 24);
        const ct = ciphertext.slice(24);
        const plaintext = cipher.open(nonce, ct, associatedData);

        if (!plaintext) {
            throw new Error("xchacha20poly1305: decryption failed");
        }

        return plaintext;
    }
}

module.exports = {
    XChaCha20Poly1305AEAD,
    NewXChaCha20Poly1305AEAD: (key, randomService) => {
        return new XChaCha20Poly1305AEAD(key, randomService);
    }
};

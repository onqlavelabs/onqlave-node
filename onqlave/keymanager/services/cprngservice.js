const forge = require("node-forge");

/**
 * @class
 * @typedef {import('node-forge').Bytes} Bytes
 */
class CPRNGService {
    /**
     *
     * @param size {number}
     * @returns {Bytes}
     */
    getRandomBytes(size) {
        return forge.random.getBytesSync(size);
        // const randomBuffer = Buffer.from(randomBytes, "binary");
        // forge.random.getBytesSync(size)
        // return randomBuffer;
    }

    /**
     *
     * @returns {number}
     */
    getRandomUint32() {
        const randomBytes = forge.random.getBytesSync(4);
        const buf = Buffer.from(randomBytes, "binary");
        return buf.readUInt32BE(0);
    }
}

module.exports = {
    CPRNGService,
};

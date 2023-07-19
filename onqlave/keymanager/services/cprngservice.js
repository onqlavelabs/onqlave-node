const forge = require("node-forge");

class CPRNGService {
	getRandomBytes(size) {
		const randomBytes = forge.random.getBytesSync(size);
		const randomBuffer = Buffer.from(randomBytes, "binary");
		return randomBuffer;
	}

	getRandomUint32() {
		const buf = Buffer.from(this.getRandomBytes(4), "binary");
		return buf.readUInt32BE(0);
	}
}

module.exports = {
	CPRNGService,
};

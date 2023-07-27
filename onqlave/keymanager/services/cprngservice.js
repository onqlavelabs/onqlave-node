const forge = require("node-forge");

class CPRNGService {
	getRandomBytes(size) {
		const randomBytes = forge.random.getBytesSync(size);
		const randomBuffer = Buffer.from(randomBytes, "binary");
		return randomBuffer;
	}

	getRandomUint32() {
		const randomBuffer = this.getRandomBytes(4);
		return randomBuffer.readUInt32BE(0);
	}
}

module.exports = {
	CPRNGService,
};

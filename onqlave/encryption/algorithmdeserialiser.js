const { AlgorithmNames} = require("../keymanager/types/types");

class AlgorithmDeserialiser {
	constructor(version, algo, key) {
		this.version = version;
		this.algo = algo;
		this.key = key;
	}

	deserialize(buffer) {
		if (buffer.length < 7) {
			throw new Error("Invalid cipher data");
		}

		const headerLen = buffer.readUInt32BE(0);

		if (buffer.length < headerLen) {
			throw new Error("Invalid cipher data");
		}

		this.version = buffer.readUInt8(4);
		const algo = buffer.readUInt8(5);

		this.algo = AlgorithmNames[algo];
		const keyLen = buffer.readUInt8(6);
		this.key = buffer.slice(7, 7 + keyLen);

		return headerLen;
	}
	getAlgorithm() {
		return this.algo;
	}
	getKey() {
		return this.key;
	}
	getVersion() {
		return this.version;
	}
}

module.exports = {
	AlgorithmDeserialiser
};
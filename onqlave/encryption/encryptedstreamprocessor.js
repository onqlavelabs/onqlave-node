const {Readable,} = require("stream");
const {AlgorithmDeserialiser} = require("./algorithmdeserialiser");

class EncryptedStreamProcessor {
	constructor() {
		this._buffer = null;
	}

	readHeader(chunk) {
		const headerLenBuffer = chunk.slice(0, 4);
		if (headerLenBuffer === null) {
			throw new Error("Invalid cipher data");
		}
		const headerLen = headerLenBuffer.readUInt32BE(0);
		const headerBuffer = chunk.slice(4, headerLen);
		if (headerBuffer === null) {
			throw new Error("Invalid cipher data");
		}
		const algorithm = new AlgorithmDeserialiser();
		algorithm.deserialize(Buffer.concat([headerLenBuffer, headerBuffer]));
		this._buffer = chunk.slice(headerLen);
		return algorithm;
	}

	readPacket(chunk) {
		if (chunk) {
			this._buffer = Buffer.concat([this._buffer, chunk]);
		}
		const packetLenBuffer = this._buffer.slice(0, 4);
		if (packetLenBuffer === null) {
			throw new Error("Invalid cipher data");
		}
		const packetLen = packetLenBuffer.readUInt32BE(0);
		const buffer = this._buffer.slice(4, packetLen + 4);
		if (buffer === null) {
			throw new Error("Invalid cipher data");
		}
		this._buffer = this._buffer.slice(packetLen + 4);
		return buffer;
	}
}

class BufferEncryptedStreamProcessor {
	constructor(cipherStream) {
		if (!(cipherStream instanceof Readable)) {
			throw new Error("cipherStream must be an instance of Readable");
		}
		this.cipherStream = cipherStream;
		this._buffer = Buffer.alloc(0);
	}

	async readHeader() {
		const headerLenBuffer = await this.readNBytes(4);
		if (headerLenBuffer === null) {
			throw new Error("Invalid cipher data");
		}
		const headerLen = headerLenBuffer.readUInt32BE(0);
		const headerBuffer = await this.readNBytes(headerLen - 4);
		if (headerBuffer === null) {
			throw new Error("Invalid cipher data");
		}
		const algorithm = new AlgorithmDeserialiser();
		algorithm.deserialize(Buffer.concat([headerLenBuffer, headerBuffer]));
		return algorithm;
	}

	async readPacket() {
		const packetLenBuffer = await this.readNBytes(4);
		if (packetLenBuffer === null) {
			throw new Error("Invalid cipher data");
		}
		const packetLen = packetLenBuffer.readUInt32BE(0);
		const buffer = await this.readNBytes(packetLen);
		if (buffer === null) {
			throw new Error("Invalid cipher data");
		}
		return buffer;
	}

	readNBytes(n) {
		return new Promise((resolve, reject) => {
			if (this._buffer.length >= n) {
				const cb = this._buffer.subarray(0, n);
				this._buffer = this._buffer.subarray(n);
				return resolve(cb);
			}
			let chunk;
			while (null !== (chunk = this.cipherStream.read(n - this._buffer.length))) {
				this._buffer = Buffer.concat([this._buffer, chunk]);
			}
			if (this._buffer.length >= n) {
				const buff = this._buffer.subarray(0, n);
				this._buffer = this._buffer.subarray(n);
				resolve(buff);
			} else {
				reject(new Error("Invalid cipher data"));
			}
		});
	}
}

module.exports = {
	BufferEncryptedStreamProcessor,
	EncryptedStreamProcessor,
};
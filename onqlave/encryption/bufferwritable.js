const { Writable } = require("stream");

class BufferWritable extends Writable {
	constructor() {
		super();
		this._buffer = Buffer.alloc(0);
	}

	_write(chunk, encoding, callback) {
		this._buffer = Buffer.concat([this._buffer, chunk]);
		callback();
	}

	buffer() {
		return this._buffer;
	}
}

module.exports =  {
	BufferWritable
};
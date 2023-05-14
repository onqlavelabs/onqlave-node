
const { Writable, } = require('stream')

class PlainStreamProcessor {
    constructor(stream) {
        if (!(stream instanceof Writable)) {
            throw new Error("cipherStream must be an instance of Writable");
        }
        this.stream = stream;
    }

    writeHeader(algorithm) {
        return new Promise((resolve, reject) => {
            const header = algorithm.serialize();
            this.stream.write(header, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    writePacket(packet) {
        return new Promise((resolve, reject) => {
            const dataLen = Buffer.alloc(4);
            dataLen.writeUInt32BE(packet.length, 0);
            const buffer = Buffer.concat([dataLen, packet]);
            this.stream.write(buffer, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    writePlainPacket(packet) {
        return new Promise((resolve, reject) => {
            this.stream.write(packet, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = {
    PlainStreamProcessor
}
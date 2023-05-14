
const { AlgorithmType } = require('../keymanager/types/types')

class AlgorithmSerialiser {
    constructor(version, algo, key) {
        this.version = version;
        this.algo = AlgorithmType[algo];
        this.key = key;
    }

    serialize() {
        const headerLen = Buffer.alloc(4);
        headerLen.writeUInt32BE(7 + this.key.length);

        const buf = Buffer.alloc(7 + this.key.length);
        let offset = 0;

        headerLen.copy(buf, offset);
        offset += headerLen.length;

        buf.writeUInt8(this.version, offset);
        offset += 1;

        buf.writeUInt8(this.algo, offset);
        offset += 1;

        buf.writeUInt8(this.key.length, offset);
        offset += 1;

        this.key.copy(buf, offset);

        return buf;
    }
}

module.exports = {
    AlgorithmSerialiser
}
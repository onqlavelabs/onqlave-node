"use strict";
var AlgorithmType = require("../keymanager/types/types").AlgorithmType;
var AlgorithmSerialiser = /** @class */ (function () {
    function AlgorithmSerialiser(version, algo, key) {
        this.version = version;
        this.algo = AlgorithmType[algo];
        this.key = key;
    }
    AlgorithmSerialiser.prototype.serialize = function () {
        var headerLen = Buffer.alloc(4);
        headerLen.writeUInt32BE(7 + this.key.length);
        var buf = Buffer.alloc(7 + this.key.length);
        var offset = 0;
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
    };
    return AlgorithmSerialiser;
}());
module.exports = {
    AlgorithmSerialiser: AlgorithmSerialiser
};
//# sourceMappingURL=algorithmserialiser.js.map
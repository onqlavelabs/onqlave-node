"use strict";
var AlgorithmNames = require("../keymanager/types/types").AlgorithmNames;
var AlgorithmDeserialiser = /** @class */ (function () {
    function AlgorithmDeserialiser(version, algo, key) {
        this.version = version;
        this.algo = algo;
        this.key = key;
    }
    AlgorithmDeserialiser.prototype.deserialize = function (buffer) {
        if (buffer.length < 7) {
            throw new Error("Invalid cipher data");
        }
        var headerLen = buffer.readUInt32BE(0);
        if (buffer.length < headerLen) {
            throw new Error("Invalid cipher data");
        }
        this.version = buffer.readUInt8(4);
        var algo = buffer.readUInt8(5);
        this.algo = AlgorithmNames[algo];
        var keyLen = buffer.readUInt8(6);
        this.key = buffer.slice(7, 7 + keyLen);
        return headerLen;
    };
    AlgorithmDeserialiser.prototype.getAlgorithm = function () {
        return this.algo;
    };
    AlgorithmDeserialiser.prototype.getKey = function () {
        return this.key;
    };
    AlgorithmDeserialiser.prototype.getVersion = function () {
        return this.version;
    };
    return AlgorithmDeserialiser;
}());
module.exports = {
    AlgorithmDeserialiser: AlgorithmDeserialiser
};
//# sourceMappingURL=algorithmdeserialiser.js.map
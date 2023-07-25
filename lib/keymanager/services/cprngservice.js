"use strict";
var forge = require("node-forge");
/**
 * @class
 * @typedef {import('node-forge').Bytes} Bytes
 */
var CPRNGService = /** @class */ (function () {
    function CPRNGService() {
    }
    /**
     *
     * @param size {number}
     * @returns {Bytes}
     */
    CPRNGService.prototype.getRandomBytes = function (size) {
        return forge.random.getBytesSync(size);
        // const randomBuffer = Buffer.from(randomBytes, "binary");
        // forge.random.getBytesSync(size)
        // return randomBuffer;
    };
    /**
     *
     * @returns {number}
     */
    CPRNGService.prototype.getRandomUint32 = function () {
        var randomBytes = forge.random.getBytesSync(4);
        var buf = Buffer.from(randomBytes, "binary");
        return buf.readUInt32BE(0);
    };
    return CPRNGService;
}());
module.exports = {
    CPRNGService: CPRNGService,
};
//# sourceMappingURL=cprngservice.js.map
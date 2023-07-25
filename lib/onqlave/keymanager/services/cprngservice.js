"use strict";
var forge = require("node-forge");
var CPRNGService = /** @class */ (function () {
    function CPRNGService() {
    }
    CPRNGService.prototype.getRandomBytes = function (size) {
        var randomBytes = forge.random.getBytesSync(size);
        var randomBuffer = Buffer.from(randomBytes, "binary");
        return randomBuffer;
    };
    CPRNGService.prototype.getRandomUint32 = function () {
        var buf = Buffer.from(this.getRandomBytes(4), "binary");
        return buf.readUInt32BE(0);
    };
    return CPRNGService;
}());
module.exports = {
    CPRNGService: CPRNGService,
};
//# sourceMappingURL=cprngservice.js.map
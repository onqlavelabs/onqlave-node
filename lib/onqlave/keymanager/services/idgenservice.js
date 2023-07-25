"use strict";
var v4 = require("uuid").v4;
var IDService = /** @class */ (function () {
    function IDService(randomService) {
        this.randomService = randomService;
    }
    IDService.prototype.newStringID = function () {
        return v4();
    };
    IDService.prototype.newKeyID = function () {
        return this.randomService.getRandomUint32();
    };
    return IDService;
}());
module.exports = {
    IDService: IDService,
};
//# sourceMappingURL=idgenservice.js.map
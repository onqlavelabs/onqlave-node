"use strict";
var v4 = require("uuid").v4;
var CPRNGService = require('./cprngservice').CPRNGService;
/**
 * @class
 */
var IDService = /** @class */ (function () {
    /**
     *
     * @param randomService {CPRNGService}
     */
    function IDService(randomService) {
        this.randomService = randomService;
    }
    /**
     *
     * @returns {string}
     */
    IDService.prototype.newStringID = function () {
        return v4();
    };
    /**
     *
     * @returns {number|number|*}
     */
    IDService.prototype.newKeyID = function () {
        return this.randomService.getRandomUint32();
    };
    return IDService;
}());
module.exports = {
    IDService: IDService,
};
//# sourceMappingURL=idgenservice.js.map
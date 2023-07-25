"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a = require("../types/types"), WrappingKeyOperation = _a.WrappingKeyOperation, RsaSsaPkcs1KeyFormat = _a.RsaSsaPkcs1KeyFormat, RSASSAPKCS1KeyVersion = _a.RSASSAPKCS1KeyVersion, HashType = _a.HashType;
var RSASSAPKCS1SHA2562048KeyOperation = /** @class */ (function (_super) {
    __extends(RSASSAPKCS1SHA2562048KeyOperation, _super);
    function RSASSAPKCS1SHA2562048KeyOperation(factory) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.format = new RsaSsaPkcs1KeyFormat(RSASSAPKCS1KeyVersion, HashType.SHA256);
        return _this;
    }
    RSASSAPKCS1SHA2562048KeyOperation.prototype.getFormat = function () {
        return this.format;
    };
    RSASSAPKCS1SHA2562048KeyOperation.prototype.getFactory = function () {
        return this.factory;
    };
    return RSASSAPKCS1SHA2562048KeyOperation;
}(WrappingKeyOperation));
module.exports = {
    RSASSAPKCS1SHA2562048KeyOperation: RSASSAPKCS1SHA2562048KeyOperation,
    NewRSASSAPKCS1SHA2562048KeyOperation: function (factory) {
        return new RSASSAPKCS1SHA2562048KeyOperation(factory);
    },
};
//# sourceMappingURL=rsassapkcs1shaoperation.js.map
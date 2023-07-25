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
var OnqlaveError = /** @class */ (function (_super) {
    __extends(OnqlaveError, _super);
    function OnqlaveError(code, message, originalError) {
        if (originalError === void 0) { originalError = null; }
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.originalError = originalError;
        return _this;
    }
    OnqlaveError.newOnqlaveErrorf = function (code, format) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var message = format.replace(/%s/g, function () { return args.shift(); });
        return new OnqlaveError(code, message);
    };
    OnqlaveError.newOnqlaveErrorWrap = function (code, err, message) {
        return new OnqlaveError(code, message, err);
    };
    OnqlaveError.newOnqlaveErrorWrapf = function (code, err, format) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var message = format.replace(/%s/g, function () { return args.shift(); });
        return new OnqlaveError(code, message, err);
    };
    OnqlaveError.prototype.getOriginalError = function () {
        return this.originalError;
    };
    OnqlaveError.prototype.getMessage = function () {
        return "Message: ".concat(this.message);
    };
    OnqlaveError.prototype.getCode = function () {
        return "Code: ".concat(this.code);
    };
    return OnqlaveError;
}(Error));
var ErrorCodes = {
    Server: "Server",
    InvalidInput: "InvalidInput",
    SdkErrorCode: "400",
};
module.exports = {
    OnqlaveError: OnqlaveError,
    ErrorCodes: ErrorCodes,
};
//# sourceMappingURL=errors.js.map
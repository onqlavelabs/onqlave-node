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
var BaseErrorResponse = /** @class */ (function () {
    function BaseErrorResponse(_a) {
        var error = _a.error;
        this.error = error;
    }
    return BaseErrorResponse;
}());
var BaseError = /** @class */ (function () {
    function BaseError(_a) {
        var status = _a.status, message = _a.message, correlationId = _a.correlationId, details = _a.details, code = _a.code;
        this.status = status;
        this.message = message;
        this.correlationId = correlationId;
        this.details = details;
        this.code = code;
    }
    return BaseError;
}());
var DecryptionOpenResponse = /** @class */ (function (_super) {
    __extends(DecryptionOpenResponse, _super);
    function DecryptionOpenResponse(_a) {
        var wrappingKey = _a.wrappingKey, securityModel = _a.securityModel, dataKey = _a.dataKey, error = _a.error;
        var _this = _super.call(this, { error: error }) || this;
        _this.wrappingKey = wrappingKey;
        _this.securityModel = securityModel;
        _this.dataKey = dataKey;
        return _this;
    }
    return DecryptionOpenResponse;
}(BaseErrorResponse));
var EncryptionOpenResponse = /** @class */ (function (_super) {
    __extends(EncryptionOpenResponse, _super);
    function EncryptionOpenResponse(_a) {
        var wrappingKey = _a.wrappingKey, dataKey = _a.dataKey, securityModel = _a.securityModel, error = _a.error, maxUses = _a.maxUses;
        var _this = _super.call(this, { error: error }) || this;
        _this.wrappingKey = wrappingKey;
        _this.dataKey = dataKey;
        _this.securityModel = securityModel;
        _this.maxUses = maxUses;
        return _this;
    }
    return EncryptionOpenResponse;
}(BaseErrorResponse));
module.exports = {
    BaseErrorResponse: BaseErrorResponse,
    BaseError: BaseError,
    DecryptionOpenResponse: DecryptionOpenResponse,
    EncryptionOpenResponse: EncryptionOpenResponse,
};
//# sourceMappingURL=responses.js.map
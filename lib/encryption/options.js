"use strict";
var CredentialOption = /** @class */ (function () {
    function CredentialOption(credential) {
        this.credential = credential;
    }
    CredentialOption.prototype.apply = function (configuration) {
        configuration.credential = this.credential;
    };
    return CredentialOption;
}());
var RetryOption = /** @class */ (function () {
    function RetryOption(retry) {
        this.retry = retry;
    }
    RetryOption.prototype.apply = function (configuration) {
        configuration.retry = this.retry;
    };
    return RetryOption;
}());
var ArxOption = /** @class */ (function () {
    function ArxOption(arxURL) {
        this.arxURL = arxURL;
    }
    ArxOption.prototype.apply = function (configuration) {
        configuration.arxURL = this.arxURL;
    };
    return ArxOption;
}());
function withCredential(credential) {
    return new CredentialOption(credential);
}
function withRetry(retry) {
    return new RetryOption(retry);
}
function withArx(arxURL) {
    return new ArxOption(arxURL);
}
var INVALID_ARX = "invalid_arx";
module.exports = {
    withCredential: withCredential,
    withRetry: withRetry,
    withArx: withArx,
    INVALID_ARX: INVALID_ARX
};
//# sourceMappingURL=options.js.map
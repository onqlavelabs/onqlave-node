"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var NewClient = require("./client").NewClient;
var _a = require("../errors/errors"), OnqlaveError = _a.OnqlaveError, ErrorCodes = _a.ErrorCodes;
var performance = require("perf_hooks").performance;
var Configuration = /** @class */ (function () {
    function Configuration(credential, retry, arxUrl, arxId) {
        this.credential = credential;
        this.retry = retry;
        this.arxUrl = arxUrl;
        this.arxId = arxId;
    }
    return Configuration;
}());
var Credential = /** @class */ (function () {
    function Credential(accessKey, signingKey) {
        this.accessKey = accessKey;
        this.signingKey = signingKey;
    }
    return Credential;
}());
var Connection = /** @class */ (function () {
    function Connection(configuration, hasher, logger) {
        if (logger === void 0) { logger = console; }
        this.client = NewClient(configuration.retry, logger);
        this.hasher = hasher;
        this.logger = logger;
        this.configuration = configuration;
    }
    Connection.prototype.post = function (resource, body) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, start, urlString, arxId, now, content, contentLen, digest, headersToSign, signature, headers, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = "Post";
                        start = performance.now();
                        this.logger.info("[onqlave] SDK: ".concat(operation, " - Sending request started"));
                        urlString = "".concat(this.configuration.arxUrl, "/").concat(resource);
                        arxId = this.configuration.arxId;
                        now = Math.floor(Date.now() / 1000);
                        content = JSON.stringify(body);
                        contentLen = content.length;
                        return [4 /*yield*/, this.hasher.digest(body)];
                    case 1:
                        digest = _a.sent();
                        headersToSign = {
                            "ONQLAVE-API-KEY": this.configuration.credential.accessKey,
                            "ONQLAVE-ARX": arxId,
                            "ONQLAVE-HOST": this.configuration.arxUrl,
                            "User-Agent": "Onqlave/0.1",
                            "ONQLAVE-CONTEXT-LEN": contentLen,
                            "ONQLAVE-DIGEST": digest,
                            "ONQLAVE-VERSION": "0.1",
                        };
                        return [4 /*yield*/, this.hasher.sign(headersToSign, this.configuration.credential.signingKey)];
                    case 2:
                        signature = _a.sent();
                        headers = {
                            "Content-Type": "application/json",
                            "ONQLAVE-API-KEY": this.configuration.credential.accessKey,
                            "ONQLAVE-ARX": arxId,
                            "ONQLAVE-HOST": this.configuration.arxUrl,
                            "User-Agent": "Onqlave/0.1",
                            "ONQLAVE-CONTEXT-LEN": contentLen,
                            "ONQLAVE-DIGEST": digest,
                            "ONQLAVE-VERSION": "0.1",
                            "ONQLAVE-REQUEST-TIME": now,
                            "ONQLAVE-SIGNATURE": signature,
                        };
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.client.post(urlString, body, headers)];
                    case 4:
                        response = _a.sent();
                        this.logger.info("[onqlave] SDK: ".concat(operation, " - Sending request finished successfully: operation took ").concat(performance.now() - start, " ms"));
                        return [2 /*return*/, response];
                    case 5:
                        error_1 = _a.sent();
                        this.logger.error(JSON.stringify(error_1));
                        throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error_1, "[onqlave] SDK: ".concat(operation, " - Failed sending request"));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Connection;
}());
module.exports = {
    Connection: Connection,
    Configuration: Configuration,
    Credential: Credential,
    NewConnection: function (configuration, hasher, logger) {
        if (logger === void 0) { logger = console; }
        return new Connection(configuration, hasher, logger = console);
    }
};
//# sourceMappingURL=connection.js.map
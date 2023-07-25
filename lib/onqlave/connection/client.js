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
var axios = require("axios");
var axiosRetry = require("axios-retry");
var performance = require("perf_hooks").performance;
var RetrySettings = /** @class */ (function () {
    function RetrySettings(count, waitTime, maxWaitTime) {
        if (count === void 0) { count = 3; }
        if (waitTime === void 0) { waitTime = 400; }
        if (maxWaitTime === void 0) { maxWaitTime = 2000; }
        this.count = count;
        this.waitTime = waitTime;
        this.maxWaitTime = maxWaitTime;
    }
    RetrySettings.prototype.valid = function () {
        if (this.count <= 0) {
            throw new Error("invalid retry count");
        }
        if (this.waitTime <= 0) {
            throw new Error("invalid wait time");
        }
        return null;
    };
    return RetrySettings;
}());
var Client = /** @class */ (function () {
    function Client(retrySettings, logger) {
        if (retrySettings === void 0) { retrySettings = new RetrySettings(); }
        if (logger === void 0) { logger = console; }
        this.retrySettings = retrySettings;
        this.logger = logger;
    }
    Client.prototype.post = function (resource, body, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, start, response, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = "Http";
                        this.logger.info("[onqlave] SDK: ".concat(operation, " - Http operation started"));
                        start = performance.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        axiosRetry(axios, {
                            retries: this.retrySettings.count, retryDelay: function (retryCount) {
                                return retryCount * _this.retrySettings.waitTime;
                            }
                        });
                        return [4 /*yield*/, axios.post(resource, body, { headers: headers })];
                    case 2:
                        response = _a.sent();
                        this.logger.info("[onqlave] SDK: ".concat(operation, " - Http operation finished successfully: operation took ").concat(performance.now() - start, " ms"));
                        return [2 /*return*/, response.data];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}());
module.exports = {
    Client: Client,
    RetrySettings: RetrySettings,
    NewClient: function (retrySettings, logger) {
        if (retrySettings === void 0) { retrySettings = new RetrySettings(); }
        if (logger === void 0) { logger = console; }
        return new Client(retrySettings, logger);
    }
};
//# sourceMappingURL=client.js.map
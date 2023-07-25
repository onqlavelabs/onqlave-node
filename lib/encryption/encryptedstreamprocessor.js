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
var Readable = require("stream").Readable;
var AlgorithmDeserialiser = require("./algorithmdeserialiser").AlgorithmDeserialiser;
var EncryptedStreamProcessor = /** @class */ (function () {
    function EncryptedStreamProcessor() {
        this._buffer = null;
    }
    EncryptedStreamProcessor.prototype.readHeader = function (chunk) {
        var headerLenBuffer = chunk.slice(0, 4);
        if (headerLenBuffer === null) {
            throw new Error("Invalid cipher data");
        }
        try {
            var headerLen = headerLenBuffer.readUInt32BE(0);
            var headerBuffer = chunk.slice(4, headerLen);
            if (headerBuffer === null) {
                throw new Error("Invalid cipher data");
            }
            var algorithm = new AlgorithmDeserialiser();
            algorithm.deserialize(Buffer.concat([headerLenBuffer, headerBuffer]));
            this._buffer = chunk.slice(headerLen);
            return algorithm;
        }
        catch (error) {
            throw error;
        }
    };
    EncryptedStreamProcessor.prototype.readPacket = function (chunk) {
        if (chunk) {
            this._buffer = Buffer.concat([this._buffer, chunk]);
        }
        var packetLenBuffer = this._buffer.slice(0, 4);
        if (packetLenBuffer === null) {
            throw new Error("Invalid cipher data");
        }
        var packetLen = packetLenBuffer.readUInt32BE(0);
        var buffer = this._buffer.slice(4, packetLen + 4);
        if (buffer === null) {
            throw new Error("Invalid cipher data");
        }
        this._buffer = this._buffer.slice(packetLen + 4);
        return buffer;
    };
    return EncryptedStreamProcessor;
}());
var BufferEncryptedStreamProcessor = /** @class */ (function () {
    function BufferEncryptedStreamProcessor(cipherStream) {
        if (!(cipherStream instanceof Readable)) {
            throw new Error("cipherStream must be an instance of Readable");
        }
        this.cipherStream = cipherStream;
        this._buffer = Buffer.alloc(0);
    }
    BufferEncryptedStreamProcessor.prototype.readHeader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headerLenBuffer, headerLen, headerBuffer, algorithm, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readNBytes(4)];
                    case 1:
                        headerLenBuffer = _a.sent();
                        if (headerLenBuffer === null) {
                            throw new Error("Invalid cipher data");
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        headerLen = headerLenBuffer.readUInt32BE(0);
                        return [4 /*yield*/, this.readNBytes(headerLen - 4)];
                    case 3:
                        headerBuffer = _a.sent();
                        if (headerBuffer === null) {
                            throw new Error("Invalid cipher data");
                        }
                        algorithm = new AlgorithmDeserialiser();
                        algorithm.deserialize(Buffer.concat([headerLenBuffer, headerBuffer]));
                        return [2 /*return*/, algorithm];
                    case 4:
                        error_1 = _a.sent();
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BufferEncryptedStreamProcessor.prototype.readPacket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var packetLenBuffer, packetLen, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readNBytes(4)];
                    case 1:
                        packetLenBuffer = _a.sent();
                        if (packetLenBuffer === null) {
                            throw new Error("Invalid cipher data");
                        }
                        packetLen = packetLenBuffer.readUInt32BE(0);
                        return [4 /*yield*/, this.readNBytes(packetLen)];
                    case 2:
                        buffer = _a.sent();
                        if (buffer === null) {
                            throw new Error("Invalid cipher data");
                        }
                        return [2 /*return*/, buffer];
                }
            });
        });
    };
    BufferEncryptedStreamProcessor.prototype.readNBytes = function (n) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._buffer.length >= n) {
                var cb = _this._buffer.subarray(0, n);
                _this._buffer = _this._buffer.subarray(n);
                return resolve(cb);
            }
            var chunk;
            while (null !== (chunk = _this.cipherStream.read(n - _this._buffer.length))) {
                _this._buffer = Buffer.concat([_this._buffer, chunk]);
            }
            if (_this._buffer.length >= n) {
                var buff = _this._buffer.subarray(0, n);
                _this._buffer = _this._buffer.subarray(n);
                resolve(buff);
            }
            else {
                reject(new Error("Invalid cipher data"));
            }
        });
    };
    return BufferEncryptedStreamProcessor;
}());
module.exports = {
    BufferEncryptedStreamProcessor: BufferEncryptedStreamProcessor,
    EncryptedStreamProcessor: EncryptedStreamProcessor,
};
//# sourceMappingURL=encryptedstreamprocessor.js.map
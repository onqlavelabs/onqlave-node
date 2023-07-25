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
var _a = require("../keymanager/keymanagerclient"), NewKeyManager = _a.NewKeyManager, KeyManagerConfiguration = _a.KeyManagerConfiguration;
var Credential = require("../credentials/credential").Credential;
var _b = require("../connection/client"), RetrySettings = _b.RetrySettings, INVALID_ARX = _b.INVALID_ARX;
var IDService = require("../keymanager/services/idgenservice").IDService;
var CPRNGService = require("../keymanager/services/cprngservice").CPRNGService;
var NewAEADGCMKeyFactory = require("../keymanager/factories/aesgcmfactory").NewAEADGCMKeyFactory;
var NewXChaCha20Poly1305KeyFactory = require("../keymanager/factories/xchacha20poly1305factory").NewXChaCha20Poly1305KeyFactory;
var NewAES128GCMKeyOperation = require("../keymanager/operations/aes128gcmoperation").NewAES128GCMKeyOperation;
var NewAES256GCMKeyOperation = require("../keymanager/operations/aes256gcmoperation").NewAES256GCMKeyOperation;
var NewXChaCha20Poly1305KeyOperation = require("../keymanager/operations/xchacha20poly1305operation").NewXChaCha20Poly1305KeyOperation;
var Algorithms = require("../keymanager/types/types").Algorithms;
var _c = require("../errors/errors"), OnqlaveError = _c.OnqlaveError, ErrorCodes = _c.ErrorCodes;
var performance = require("perf_hooks").performance;
var _d = require("stream"), Readable = _d.Readable, Writable = _d.Writable;
var BufferWritable = require("./bufferwritable").BufferWritable;
var _e = require("./encryptedstreamprocessor"), BufferEncryptedStreamProcessor = _e.BufferEncryptedStreamProcessor, EncryptedStreamProcessor = _e.EncryptedStreamProcessor;
var PlainStreamProcessor = require("./plainstreamprocessort").PlainStreamProcessor;
var AlgorithmSerialiser = require("./algorithmserialiser").AlgorithmSerialiser;
/**
 * @class
 */
var Encryption = /** @class */ (function () {
    function Encryption() {
        var _a;
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        var options = new KeyManagerConfiguration(new Credential(), new RetrySettings(), INVALID_ARX);
        for (var _b = 0, opts_1 = opts; _b < opts_1.length; _b++) {
            var o = opts_1[_b];
            o.apply(options);
        }
        this.logger = console;
        var randomService = new CPRNGService();
        var idService = new IDService(randomService);
        var keyManager = NewKeyManager(options, randomService);
        var aeadGcmKeyFactory = NewAEADGCMKeyFactory(idService, randomService);
        var xchchaKeyFactory = NewXChaCha20Poly1305KeyFactory(idService, randomService);
        /**
         *
         * @type {Object.<string, KeyOperation>}
         */
        var operations = (_a = {},
            _a[Algorithms.Aesgcm128] = NewAES128GCMKeyOperation(aeadGcmKeyFactory),
            _a[Algorithms.Aesgcm256] = NewAES256GCMKeyOperation(aeadGcmKeyFactory),
            _a[Algorithms.XChacha20poly1305] = NewXChaCha20Poly1305KeyOperation(xchchaKeyFactory),
            _a);
        this.keyManager = keyManager;
        this.operations = operations;
    }
    Encryption.prototype.close = function () {
        this.keyManager = null;
    };
    /**
     *
     * @param cipherStream {Readable}
     * @param plainStream {Writable}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Promise<void>}
     */
    Encryption.prototype.encryptStream = function (plainStream, cipherStream, associatedData) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, start, _a, algorithm, primitive_1, processor_1, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = "EncryptStream";
                        start = performance.now();
                        this.logger.info("Encrypting operation: ".concat(operation));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        if (!(plainStream instanceof Readable)) {
                            throw new Error("plainStream must be an instance of Readable");
                        }
                        if (!(cipherStream instanceof Writable)) {
                            throw new Error("cipherStream must be an instance of Writable");
                        }
                        return [4 /*yield*/, this.initEncryptOperation(operation)];
                    case 2:
                        _a = _b.sent(), algorithm = _a.algorithm, primitive_1 = _a.primitive;
                        processor_1 = new PlainStreamProcessor(cipherStream);
                        return [4 /*yield*/, processor_1.writeHeader(algorithm)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this._readFromStream(plainStream, function (chunk) { return __awaiter(_this, void 0, void 0, function () {
                                var cipherData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!chunk) return [3 /*break*/, 2];
                                            cipherData = primitive_1.encrypt(chunk, associatedData);
                                            return [4 /*yield*/, processor_1.writePacket(cipherData)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 2];
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 4:
                        _b.sent();
                        this.logger.info("[onqlave] SDK: ".concat(operation, " - Encrypted plain data: operation took ").concat(performance.now() - start, " ms"));
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error_1, "[onqlave] SDK: ".concat(operation, " - Failed encrypting plain data"));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param cipherStream {Writable}
     * @param plainStream {Readable}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Promise<void>}
     */
    Encryption.prototype.decryptStream = function (cipherStream, plainStream, associatedData) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, start, processor_2, outProcessor_1, algo_1, primitive_2, plainData_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = "DecryptStream";
                        start = performance.now();
                        this.logger.info("Decrypting operation: ".concat(operation));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!(plainStream instanceof Writable)) {
                            throw new Error("plainStream must be an instance of Writable");
                        }
                        if (!(cipherStream instanceof Readable)) {
                            throw new Error("cipherStream must be an instance of Readable");
                        }
                        processor_2 = new EncryptedStreamProcessor();
                        outProcessor_1 = new PlainStreamProcessor(plainStream);
                        algo_1 = null;
                        primitive_2 = null;
                        plainData_1 = null;
                        return [4 /*yield*/, this._readFromStream(cipherStream, function (chunk) { return __awaiter(_this, void 0, void 0, function () {
                                var cipher, cipher;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!chunk) return [3 /*break*/, 6];
                                            if (!(algo_1 === null)) return [3 /*break*/, 2];
                                            algo_1 = processor_2.readHeader(chunk);
                                            return [4 /*yield*/, this.initDecryptOperation(operation, algo_1)];
                                        case 1:
                                            primitive_2 = _a.sent();
                                            return [3 /*break*/, 5];
                                        case 2:
                                            cipher = processor_2.readPacket(chunk);
                                            return [4 /*yield*/, primitive_2.decrypt(cipher, associatedData)];
                                        case 3:
                                            plainData_1 = _a.sent();
                                            return [4 /*yield*/, outProcessor_1.writePlainPacket(plainData_1)];
                                        case 4:
                                            _a.sent();
                                            _a.label = 5;
                                        case 5: return [3 /*break*/, 9];
                                        case 6:
                                            cipher = processor_2.readPacket(null);
                                            return [4 /*yield*/, primitive_2.decrypt(cipher, associatedData)];
                                        case 7:
                                            plainData_1 = _a.sent();
                                            return [4 /*yield*/, outProcessor_1.writePlainPacket(plainData_1)];
                                        case 8:
                                            _a.sent();
                                            _a.label = 9;
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        this.logger.info("[onqlave] SDK: ".concat(operation, " - Decrypted cipher data: operation took ").concat(performance.now() - start, " ms"));
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error_2, "[onqlave] SDK: ".concat(operation, " - Faild decrypting cipher data"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param plainData {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Promise<{Uint8Array | Buffer}>}
     */
    Encryption.prototype.encrypt = function (plainData, associatedData) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, start, _a, algorithm, primitive, cipherData, cipherStream, processor, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operation = "Encrypt";
                        start = performance.now();
                        this.logger.info("Encrypting operation: ".concat(operation));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.initEncryptOperation(operation)];
                    case 2:
                        _a = _b.sent(), algorithm = _a.algorithm, primitive = _a.primitive;
                        cipherData = primitive.encrypt(plainData, associatedData);
                        cipherStream = new BufferWritable();
                        processor = new PlainStreamProcessor(cipherStream);
                        return [4 /*yield*/, processor.writeHeader(algorithm)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, processor.writePacket(cipherData)];
                    case 4:
                        _b.sent();
                        this.logger.info("[onqlave] SDK: ".concat(operation, " - Encrypted plain data: operation took ").concat(performance.now() - start, " ms"));
                        return [2 /*return*/, cipherStream.buffer()];
                    case 5:
                        error_3 = _b.sent();
                        console.log(error_3);
                        throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error_3, "[onqlave] SDK: ".concat(operation, " - Failed encrypting plain data"));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param cipherData {Uint8Array | Buffer}
     * @param associatedData {Uint8Array | Buffer}
     * @returns {Promise<{Uint8Array | Buffer}>}
     */
    Encryption.prototype.decrypt = function (cipherData, associatedData) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, start, cipherStream, processor, algo, cipher, primitive, plainData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operation = "Decrypt";
                        start = performance.now();
                        this.logger.info("Decrypting operation: ".concat(operation));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        cipherStream = Readable.from(cipherData);
                        processor = new BufferEncryptedStreamProcessor(cipherStream);
                        return [4 /*yield*/, processor.readHeader()];
                    case 2:
                        algo = _a.sent();
                        return [4 /*yield*/, processor.readPacket()];
                    case 3:
                        cipher = _a.sent();
                        return [4 /*yield*/, this.initDecryptOperation(operation, algo)];
                    case 4:
                        primitive = _a.sent();
                        plainData = primitive.decrypt(cipher, associatedData);
                        this.logger.info("[onqlave] SDK: ".concat(operation, " - Decrypted cipher data: operation took ").concat(performance.now() - start, " ms"));
                        return [2 /*return*/, plainData];
                    case 5:
                        error_4 = _a.sent();
                        throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error_4, "[onqlave] SDK: ".concat(operation, " - Faild decrypting cipher data"));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Encryption.prototype.initEncryptOperation = function (operation) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, edk, dk, algo, ops, factory, key, primitive, algorithm, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.keyManager.fetchEncryptionKey()];
                    case 1:
                        _a = _b.sent(), edk = _a.edk, dk = _a.dk, algo = _a.algo;
                        ops = this.operations[algo];
                        if (!ops) {
                            throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, null, "[onqlave] SDK: ".concat(operation, " - Invalid encryption operation"));
                        }
                        factory = ops.getFactory();
                        return [4 /*yield*/, factory.newKeyFromData(ops, dk)];
                    case 2:
                        key = _b.sent();
                        return [4 /*yield*/, factory.primitive(key)];
                    case 3:
                        primitive = _b.sent();
                        algorithm = new AlgorithmSerialiser(0, algo, edk);
                        return [2 /*return*/, { algorithm: algorithm, primitive: primitive }];
                    case 4:
                        error_5 = _b.sent();
                        throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error_5, "[onqlave] SDK: ".concat(operation, " - Faild encrypting plain data"));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Encryption.prototype.initDecryptOperation = function (operation, algo) {
        return __awaiter(this, void 0, void 0, function () {
            var dk, ops, factory, key, primitive, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.keyManager.fetchDecryptionKey(algo.getKey())];
                    case 1:
                        dk = _a.sent();
                        ops = this.operations[algo.getAlgorithm()];
                        if (!ops) {
                            throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, null, "[onqlave] SDK: ".concat(operation, " - Invalid encryption operation"));
                        }
                        factory = ops.getFactory();
                        return [4 /*yield*/, factory.newKeyFromData(ops, dk)];
                    case 2:
                        key = _a.sent();
                        return [4 /*yield*/, factory.primitive(key)];
                    case 3:
                        primitive = _a.sent();
                        return [2 /*return*/, primitive];
                    case 4:
                        error_6 = _a.sent();
                        throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error_6, "[onqlave] SDK: ".concat(operation, " - Faild encrypting plain data"));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Encryption.prototype._readFromStream = function (readableStream, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            readableStream.on("data", function (chunk) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            readableStream.pause();
                            return [4 /*yield*/, callback(chunk)];
                        case 1:
                            _a.sent();
                            readableStream.resume();
                            return [2 /*return*/];
                    }
                });
            }); }).on("end", function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, callback(null)];
                        case 1:
                            _a.sent();
                            resolve(null);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return Encryption;
}());
module.exports = {
    Encryption: Encryption,
    NewEncryption: function () {
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        return new Encryption(opts);
    }
};
//# sourceMappingURL=encryption.js.map
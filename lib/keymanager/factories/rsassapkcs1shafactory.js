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
var forge = require("node-forge");
var getHashes = require("crypto").getHashes;
var NewRSASSAPKCS1SHA = require("../primitives/rsassapkcs1sha").NewRSASSAPKCS1SHA;
var _a = require("../types/types"), WrappingKeyFactory = _a.WrappingKeyFactory, HashTypeName = _a.HashTypeName;
var CPRNGService = require("../services/cprngservice").CPRNGService;
/**
 * @class
 * @implements {WrappingKeyFactory}
 */
var RSASSAPKCS1SHAKeyFactory = /** @class */ (function (_super) {
    __extends(RSASSAPKCS1SHAKeyFactory, _super);
    /**
     *
     * @param randomService {CPRNGService}
     */
    function RSASSAPKCS1SHAKeyFactory(randomService) {
        var _this = _super.call(this) || this;
        _this.randomService = randomService;
        return _this;
    }
    RSASSAPKCS1SHAKeyFactory.prototype.primitive = function (operation) {
        return __awaiter(this, void 0, void 0, function () {
            var format, rsaSsaPkcs1KeyFormat, hashName, hashID, hashFunc, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        format = operation.getFormat();
                        rsaSsaPkcs1KeyFormat = format;
                        hashName = HashTypeName[rsaSsaPkcs1KeyFormat.hash];
                        return [4 /*yield*/, this.hashID(hashName)];
                    case 1:
                        hashID = _a.sent();
                        hashFunc = this.rsaHashFunc(hashID);
                        ret = NewRSASSAPKCS1SHA(hashFunc, hashID, this.randomService);
                        if (!ret) {
                            throw new Error("rsassakeyfactory: cannot create new primitive");
                        }
                        return [2 /*return*/, Promise.resolve(ret)];
                }
            });
        });
    };
    /**
     *
     * @param hashAlg {string}
     * @returns {Promise<string|undefined>}
     */
    RSASSAPKCS1SHAKeyFactory.prototype.hashID = function (hashAlg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (hashAlg) {
                    case "SHA256":
                        return [2 /*return*/, getHashes().includes("sha256") ? "sha256" : undefined];
                    case "SHA384":
                        return [2 /*return*/, getHashes().includes("sha384") ? "sha384" : undefined];
                    case "SHA512":
                        return [2 /*return*/, getHashes().includes("sha512") ? "sha512" : undefined];
                    default:
                        throw new Error("invalid hash function: ".concat(hashAlg));
                }
                return [2 /*return*/];
            });
        });
    };
    RSASSAPKCS1SHAKeyFactory.prototype.rsaHashFunc = function (hashAlg) {
        if (this.hashSafeForSignature(hashAlg)) {
            var m_1 = forge.md[hashAlg].create();
            return function () { return m_1; };
        }
        else {
            throw new Error("hash function not safe for digital signatures: ".concat(hashAlg));
        }
    };
    /**
     *
     * @param hashAlg {string}
     * @returns {boolean}
     */
    RSASSAPKCS1SHAKeyFactory.prototype.hashSafeForSignature = function (hashAlg) {
        switch (hashAlg) {
            case "sha256":
            case "sha384":
            case "sha512":
                return true;
            default:
                return false;
        }
    };
    return RSASSAPKCS1SHAKeyFactory;
}(WrappingKeyFactory));
module.exports = {
    RSASSAPKCS1SHAKeyFactory: RSASSAPKCS1SHAKeyFactory,
    NewRSASSAPKCS1SHAKeyFactory: function (randomService) {
        return new RSASSAPKCS1SHAKeyFactory(randomService);
    }
};
//# sourceMappingURL=rsassapkcs1shafactory.js.map
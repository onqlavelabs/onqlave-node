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
var _a = require("../types/types"), KeyFactory = _a.KeyFactory, KeyMaterialType = _a.KeyMaterialType, AESGCMKeyVersion = _a.AESGCMKeyVersion;
var NewAESGCMAEAD = require("../primitives/aesgcmaead").NewAESGCMAEAD;
var _b = require("../keys/aesgcm"), AesGcmKeyData = _b.AesGcmKeyData, NewAesGcmKey = _b.NewAesGcmKey;
var AesGcmKeyFactory = /** @class */ (function (_super) {
    __extends(AesGcmKeyFactory, _super);
    function AesGcmKeyFactory(idService, randomService) {
        var _this = _super.call(this) || this;
        _this.idService = idService;
        _this.randomService = randomService;
        return _this;
    }
    AesGcmKeyFactory.prototype.newKey = function (operation) {
        return __awaiter(this, void 0, void 0, function () {
            var format, keyValue, key;
            return __generator(this, function (_a) {
                format = operation.getFormat();
                this.validateKeyFormat(format);
                keyValue = this.randomService.getRandomBytes(format.size());
                key = NewAesGcmKey(this.idService.newKeyID(), operation, new AesGcmKeyData(keyValue, KeyMaterialType.SYMMETRIC, AESGCMKeyVersion));
                return [2 /*return*/, Promise.resolve(key)];
            });
        });
    };
    AesGcmKeyFactory.prototype.newKeyFromData = function (operation, keyData) {
        return __awaiter(this, void 0, void 0, function () {
            var format, key;
            return __generator(this, function (_a) {
                format = operation.getFormat();
                this.validateKeyFormat(format);
                key = NewAesGcmKey(this.idService.newKeyID(), operation, new AesGcmKeyData(keyData, KeyMaterialType.SYMMETRIC, AESGCMKeyVersion));
                return [2 /*return*/, Promise.resolve(key)];
            });
        });
    };
    AesGcmKeyFactory.prototype.primitive = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var value, aead;
            return __generator(this, function (_a) {
                value = this.validateKey(key);
                aead = NewAESGCMAEAD(value, this.randomService);
                return [2 /*return*/, Promise.resolve(aead)];
            });
        });
    };
    AesGcmKeyFactory.prototype.validateKey = function (key) {
        var keyData = key.getData();
        this.validateKeyVersion(keyData.getVersion(), AESGCMKeyVersion);
        var value = keyData.getValue();
        if (!value) {
            throw new Error("aesgcmfactory: invalid key value");
        }
        var keySize = value.length;
        if (keySize !== 16 && keySize !== 32) {
            throw new Error("aesgcmfactory: invalid key size");
        }
        return value;
    };
    AesGcmKeyFactory.prototype.validateKeyVersion = function (version, maxExpected) {
        if (version > maxExpected) {
            throw new Error("aesgcmfactory: invalid key version");
        }
    };
    AesGcmKeyFactory.prototype.validateKeyFormat = function (format) {
        var keySize = format.size();
        if (keySize !== 16 && keySize !== 32) {
            throw new Error("aesgcmfactory: invalid key format");
        }
    };
    return AesGcmKeyFactory;
}(KeyFactory));
module.exports = {
    AesGcmKeyFactory: AesGcmKeyFactory,
    NewAEADGCMKeyFactory: function (idService, randomService) {
        return new AesGcmKeyFactory(idService, randomService);
    }
};
//# sourceMappingURL=aesgcmfactory.js.map
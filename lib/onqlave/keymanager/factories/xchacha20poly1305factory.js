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
var NewXChaCha20Poly1305AEAD = require("../primitives/xchacha20poly1305aead").NewXChaCha20Poly1305AEAD;
var _a = require("../types/types"), KeyMaterialType = _a.KeyMaterialType, XchaCha20Poly1305KeyVersion = _a.XchaCha20Poly1305KeyVersion, KeyFactory = _a.KeyFactory;
var _b = require("../keys/xchacha20poly1305"), NewXChaCha20Poly1305Key = _b.NewXChaCha20Poly1305Key, XChaCha20Poly1305KeyData = _b.XChaCha20Poly1305KeyData;
var XChaCha20Poly1305KeyFactory = /** @class */ (function (_super) {
    __extends(XChaCha20Poly1305KeyFactory, _super);
    function XChaCha20Poly1305KeyFactory(idService, randomService) {
        var _this = _super.call(this) || this;
        _this.idService = idService;
        _this.randomService = randomService;
        return _this;
    }
    XChaCha20Poly1305KeyFactory.prototype.newKey = function (operation) {
        return __awaiter(this, void 0, void 0, function () {
            var format, keyValue, key;
            return __generator(this, function (_a) {
                format = operation.getFormat();
                this.validateKeyFormat(format);
                keyValue = this.randomService.getRandomBytes(format.size());
                key = NewXChaCha20Poly1305Key(this.idService.newKeyID(), operation, new XChaCha20Poly1305KeyData(keyValue, KeyMaterialType.SYMMETRIC, XchaCha20Poly1305KeyVersion));
                return [2 /*return*/, Promise.resolve(key)];
            });
        });
    };
    XChaCha20Poly1305KeyFactory.prototype.newKeyFromData = function (operation, keyData) {
        var format = operation.getFormat();
        this.validateKeyFormat(format);
        return NewXChaCha20Poly1305Key(this.idService.newKeyID(), operation, new XChaCha20Poly1305KeyData(keyData, KeyMaterialType.SYMMETRIC, XchaCha20Poly1305KeyVersion));
    };
    XChaCha20Poly1305KeyFactory.prototype.primitive = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var value, aead;
            return __generator(this, function (_a) {
                value = this.validateKey(key);
                aead = NewXChaCha20Poly1305AEAD(value, this.randomService);
                if (!aead) {
                    return [2 /*return*/, Promise.reject(new Error("xchachapoly1305factory: cannot create new primitive"))];
                }
                return [2 /*return*/, Promise.resolve(aead)];
            });
        });
    };
    XChaCha20Poly1305KeyFactory.prototype.validateKey = function (key) {
        var keyData = key.getData();
        this.validateKeyVersion(keyData.getVersion(), XchaCha20Poly1305KeyVersion);
        var value = keyData.getValue();
        if (!value) {
            throw new Error("xchachapoly1305factory: invalid key value");
        }
        var keySize = value.length;
        if (keySize !== 32) {
            throw new Error("xchachapoly1305factory: invalid key size");
        }
        return value;
    };
    XChaCha20Poly1305KeyFactory.prototype.validateKeyFormat = function (format) {
        if (format.size() !== 32) {
            throw new Error("xchachapoly1305factory: invalid key size");
        }
    };
    XChaCha20Poly1305KeyFactory.prototype.validateKeyVersion = function (version, maxExpected) {
        if (version > maxExpected) {
            throw new Error("key has version ".concat(version, "; only keys with version in range [0..").concat(maxExpected, "] are supported"));
        }
    };
    return XChaCha20Poly1305KeyFactory;
}(KeyFactory));
module.exports = {
    XChaCha20Poly1305KeyFactory: XChaCha20Poly1305KeyFactory,
    NewXChaCha20Poly1305KeyFactory: function (idService, randomService) {
        return new XChaCha20Poly1305KeyFactory(idService, randomService);
    }
};
//# sourceMappingURL=xchacha20poly1305factory.js.map
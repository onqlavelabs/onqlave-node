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
var TypeResolver = /** @class */ (function () {
    function TypeResolver() {
    }
    TypeResolver.prototype.serialise = function (name, input) {
        // ...
    };
    TypeResolver.prototype.deserialise = function (name, input) {
        // ...
    };
    return TypeResolver;
}());
var KeyManagerClient = /** @class */ (function () {
    function KeyManagerClient() {
    }
    KeyManagerClient.prototype.fetchEncryptionKey = function () {
        //
    };
    KeyManagerClient.prototype.fetchDecryptionKey = function (edk) {
        //
    };
    return KeyManagerClient;
}());
var OnqlaveStructure = /** @class */ (function () {
    function OnqlaveStructure() {
        this.embeded = {};
        this.edk = [];
    }
    return OnqlaveStructure;
}());
var WrappingKeyFactory = /** @class */ (function () {
    function WrappingKeyFactory() {
    }
    WrappingKeyFactory.prototype.primitive = function (operation) {
        // ...
    };
    return WrappingKeyFactory;
}());
var KeyFactory = /** @class */ (function () {
    function KeyFactory() {
    }
    KeyFactory.prototype.newKey = function (operation) {
        // ...
    };
    KeyFactory.prototype.newKeyFromData = function (operation, keyData) {
        // ...
    };
    KeyFactory.prototype.primitive = function (key) {
        // ...
    };
    return KeyFactory;
}());
var AlgorithmType = {
    "unknown_algorithm": 0,
    "aes-gcm-128": 1,
    "aes-gcm-256": 2,
    "xcha-cha-20-poly-1305": 3,
};
var AlgorithmNames = {
    0: "unknown_algorithm",
    1: "aes-gcm-128",
    2: "aes-gcm-256",
    3: "xcha-cha-20-poly-1305",
};
var Algorithms = {
    Unknown: "unknown_algorithm",
    Aesgcm128: "aes-gcm-128",
    Aesgcm256: "aes-gcm-256",
    XChacha20poly1305: "xcha-cha-20-poly-1305",
    RsaSsapkcs12048sha256f4: "RSA_SSA_PKCS1_2048_SHA256_F4",
};
var WrappingKeyOperation = /** @class */ (function () {
    function WrappingKeyOperation() {
    }
    WrappingKeyOperation.prototype.getFormat = function () {
        // ...
    };
    WrappingKeyOperation.prototype.getFactory = function () {
        // ...
    };
    return WrappingKeyOperation;
}());
var KeyOperation = /** @class */ (function () {
    function KeyOperation() {
    }
    KeyOperation.prototype.getFormat = function () {
        // ...
    };
    KeyOperation.prototype.getFactory = function () {
        // ...
    };
    return KeyOperation;
}());
var KeyFormat = /** @class */ (function () {
    function KeyFormat() {
    }
    KeyFormat.prototype.size = function () {
        // ...
    };
    return KeyFormat;
}());
var AEAD = /** @class */ (function () {
    function AEAD() {
    }
    AEAD.prototype.encrypt = function (plaintext, associatedData) {
        // ...
    };
    AEAD.prototype.decrypt = function (ciphertext, associatedData) {
        // ...
    };
    return AEAD;
}());
var Unwrapping = /** @class */ (function () {
    function Unwrapping() {
    }
    Unwrapping.prototype.unwrapKey = function (wdk, epk, fp, password) {
        // ...
    };
    return Unwrapping;
}());
var KeyID = /** @class */ (function () {
    function KeyID() {
    }
    return KeyID;
}());
var AlgorithmSerializer = /** @class */ (function () {
    function AlgorithmSerializer() {
    }
    AlgorithmSerializer.prototype.serialise = function () {
        // ...
    };
    return AlgorithmSerializer;
}());
var AlgorithmDeserializer = /** @class */ (function () {
    function AlgorithmDeserializer() {
    }
    AlgorithmDeserializer.prototype.deserialise = function (buffer) {
        // ...
    };
    AlgorithmDeserializer.prototype.key = function () {
        // ...
    };
    AlgorithmDeserializer.prototype.version = function () {
        // ...
    };
    AlgorithmDeserializer.prototype.algorithm = function () {
        // ...
    };
    return AlgorithmDeserializer;
}());
var KeyData = /** @class */ (function () {
    function KeyData() {
    }
    KeyData.prototype.getValue = function () {
        // ...
    };
    KeyData.prototype.fromValue = function (data) {
        // ...
    };
    KeyData.prototype.getKeyMaterialType = function () {
        // ...
    };
    KeyData.prototype.getVersion = function () {
        // ...
    };
    return KeyData;
}());
var Key = /** @class */ (function () {
    function Key() {
    }
    Key.prototype.getKeyID = function () {
        // ...
    };
    Key.prototype.getOperation = function () {
        // ...
    };
    Key.prototype.getData = function () {
        // ...
    };
    return Key;
}());
var AESGCMKeyVersion = 0;
var RSASSAPKCS1KeyVersion = 0;
var XchaCha20Poly1305KeyVersion = 0;
var HashType = {
    UNKNOWN_HASH: 0,
    SHA1: 1,
    SHA384: 2,
    SHA256: 3,
    SHA512: 4,
    SHA224: 5,
};
var HashTypeName = [
    "UNKNOWN_HASH",
    "SHA1",
    "SHA384",
    "SHA256",
    "SHA512",
    "SHA224",
];
var KeyMaterialType = {
    UNKNOWN_KEYMATERIAL: 0,
    SYMMETRIC: 1,
    ASYMMETRIC_PRIVATE: 2,
    ASYMMETRIC_PUBLIC: 3,
    REMOTE: 4,
};
var AesGcmKeyFormat = /** @class */ (function (_super) {
    __extends(AesGcmKeyFormat, _super);
    function AesGcmKeyFormat(size, version) {
        var _this = _super.call(this) || this;
        _this.keySize = size;
        _this.version = version;
        return _this;
    }
    AesGcmKeyFormat.prototype.size = function () {
        return this.keySize;
    };
    return AesGcmKeyFormat;
}(KeyFormat));
var XChaChaKeyFormat = /** @class */ (function (_super) {
    __extends(XChaChaKeyFormat, _super);
    function XChaChaKeyFormat(size, version) {
        var _this = _super.call(this) || this;
        _this.keySize = size;
        _this.version = version;
        return _this;
    }
    XChaChaKeyFormat.prototype.size = function () {
        return this.keySize;
    };
    return XChaChaKeyFormat;
}(KeyFormat));
var RsaSsaPkcs1KeyFormat = /** @class */ (function (_super) {
    __extends(RsaSsaPkcs1KeyFormat, _super);
    function RsaSsaPkcs1KeyFormat(version, hash) {
        var _this = _super.call(this) || this;
        _this.version = version;
        _this.hash = hash;
        return _this;
    }
    RsaSsaPkcs1KeyFormat.prototype.size = function () {
        return -1;
    };
    return RsaSsaPkcs1KeyFormat;
}(KeyFormat));
module.exports = {
    TypeResolver: TypeResolver,
    OnqlaveStructure: OnqlaveStructure,
    WrappingKeyFactory: WrappingKeyFactory,
    KeyFactory: KeyFactory,
    WrappingKeyOperation: WrappingKeyOperation,
    KeyOperation: KeyOperation,
    KeyFormat: KeyFormat,
    AEAD: AEAD,
    Unwrapping: Unwrapping,
    KeyID: KeyID,
    AlgorithmSerializer: AlgorithmSerializer,
    AlgorithmDeserializer: AlgorithmDeserializer,
    KeyData: KeyData,
    Key: Key,
    AlgorithmType: AlgorithmType,
    HashType: HashType,
    HashTypeName: HashTypeName,
    KeyMaterialType: KeyMaterialType,
    AESGCMKeyVersion: AESGCMKeyVersion,
    RSASSAPKCS1KeyVersion: RSASSAPKCS1KeyVersion,
    XchaCha20Poly1305KeyVersion: XchaCha20Poly1305KeyVersion,
    AlgorithmNames: AlgorithmNames,
    Algorithms: Algorithms,
    AesGcmKeyFormat: AesGcmKeyFormat,
    RsaSsaPkcs1KeyFormat: RsaSsaPkcs1KeyFormat,
    XChaChaKeyFormat: XChaChaKeyFormat,
    KeyManagerClient: KeyManagerClient,
};
//# sourceMappingURL=types.js.map
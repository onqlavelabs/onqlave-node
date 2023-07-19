
class TypeResolver {
	constructor() { }

	serialise(name, input) {
		// ...
	}

	deserialise(name, input) {
		// ...
	}
}

class KeyManagerClient {
	fetchEncryptionKey() {
		//
	}
	fetchDecryptionKey(edk) {
		//
	}
}

class OnqlaveStructure {
	constructor() {
		this.embeded = {};
		this.edk = [];
	}
}

class WrappingKeyFactory {
	constructor() { }

	primitive(operation) {
		// ...
	}
}

class KeyFactory {
	constructor() { }

	newKey(operation) {
		// ...
	}

	newKeyFromData(operation, keyData) {
		// ...
	}

	primitive(key) {
		// ...
	}
}

const AlgorithmType = {
	"unknown_algorithm": 0,
	"aes-gcm-128": 1,
	"aes-gcm-256": 2,
	"xcha-cha-20-poly-1305": 3,
};

const AlgorithmNames = {
	0: "unknown_algorithm",
	1: "aes-gcm-128",
	2: "aes-gcm-256",
	3: "xcha-cha-20-poly-1305",
};

const Algorithms = {
	Unknown: "unknown_algorithm",
	Aesgcm128: "aes-gcm-128",
	Aesgcm256: "aes-gcm-256",
	XChacha20poly1305: "xcha-cha-20-poly-1305",
	RsaSsapkcs12048sha256f4: "RSA_SSA_PKCS1_2048_SHA256_F4",
};

class WrappingKeyOperation {
	constructor() { }

	getFormat() {
		// ...
	}

	getFactory() {
		// ...
	}
}

class KeyOperation {
	constructor() { }

	getFormat() {
		// ...
	}

	getFactory() {
		// ...
	}
}

class KeyFormat {
	constructor() { }

	size() {
		// ...
	}
}

class AEAD {
	constructor() { }

	encrypt(plaintext, associatedData) {
		// ...
	}

	decrypt(ciphertext, associatedData) {
		// ...
	}
}

class Unwrapping {
	constructor() { }

	unwrapKey(wdk, epk, fp, password) {
		// ...
	}
}

class KeyID {
	constructor() { }
}

class AlgorithmSerializer {
	constructor() { }

	serialise() {
		// ...
	}
}

class AlgorithmDeserializer {
	constructor() { }

	deserialise(buffer) {
		// ...
	}

	key() {
		// ...
	}

	version() {
		// ...
	}

	algorithm() {
		// ...
	}
}

class KeyData {
	constructor() { }

	getValue() {
		// ...
	}

	fromValue(data) {
		// ...
	}

	getKeyMaterialType() {
		// ...
	}

	getVersion() {
		// ...
	}
}

class Key {
	constructor() { }

	getKeyID() {
		// ...
	}

	getOperation() {
		// ...
	}

	getData() {
		// ...
	}
}

const AESGCMKeyVersion = 0;
const RSASSAPKCS1KeyVersion = 0;
const XchaCha20Poly1305KeyVersion = 0;

const HashType = {
	UNKNOWN_HASH: 0,
	SHA1: 1,
	SHA384: 2,
	SHA256: 3,
	SHA512: 4,
	SHA224: 5,
};

const HashTypeName = [
	"UNKNOWN_HASH",
	"SHA1",
	"SHA384",
	"SHA256",
	"SHA512",
	"SHA224",
];

const KeyMaterialType = {
	UNKNOWN_KEYMATERIAL: 0,
	SYMMETRIC: 1,
	ASYMMETRIC_PRIVATE: 2,
	ASYMMETRIC_PUBLIC: 3,
	REMOTE: 4,
};

class AesGcmKeyFormat extends KeyFormat {
	constructor(size, version) {
		super();
		this.keySize = size;
		this.version = version;
	}

	size() {
		return this.keySize;
	}
}

class XChaChaKeyFormat extends KeyFormat {
	constructor(size, version) {
		super();
		this.keySize = size;
		this.version = version;
	}

	size() {
		return this.keySize;
	}
}

class RsaSsaPkcs1KeyFormat extends KeyFormat {
	constructor(version, hash) {
		super();
		this.version = version;
		this.hash = hash;
	}

	size() {
		return -1;
	}
}

module.exports =  {
	TypeResolver,
	OnqlaveStructure,
	WrappingKeyFactory,
	KeyFactory,
	WrappingKeyOperation,
	KeyOperation,
	KeyFormat,
	AEAD,
	Unwrapping,
	KeyID,
	AlgorithmSerializer,
	AlgorithmDeserializer,
	KeyData,
	Key,
	AlgorithmType,
	HashType,
	HashTypeName,
	KeyMaterialType,
	AESGCMKeyVersion,
	RSASSAPKCS1KeyVersion,
	XchaCha20Poly1305KeyVersion,
	AlgorithmNames,
	Algorithms,
	AesGcmKeyFormat,
	RsaSsaPkcs1KeyFormat,
	XChaChaKeyFormat,
	KeyManagerClient,
};

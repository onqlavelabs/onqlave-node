const { Key, KeyData } = require("../types/types");

class AesGcmKey extends Key {
	constructor(keyID, operation, data) {
		super();
		this.keyID = keyID;
		this.operation = operation;
		this.data = data;
	}

	getKeyID() {
		return this.keyID;
	}

	getOperation() {
		return this.operation;
	}

	getData() {
		return this.data;
	}
}

class AesGcmKeyData extends KeyData {
	constructor(value, keyMaterialType, version) {
		super();
		this.value = value;
		this.keyMaterialType = keyMaterialType;
		this.version = version;
	}

	fromValue() {
		return null;
	}

	getValue() {
		return this.value;
	}

	getKeyMaterialType() {
		return this.keyMaterialType;
	}

	getVersion() {
		return this.version;
	}
}

module.exports =  {
	AesGcmKey,
	AesGcmKeyData,
	NewAesGcmKey: (id, operation, data) => {
		return new AesGcmKey(id, operation, data);
	},
};

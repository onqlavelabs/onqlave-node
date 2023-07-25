const { Key, KeyData, KeyOperation } = require("../types/types");

/**
 * @class
 * @implements {Key}
 */
class AesGcmKey {
	/**
	 *
	 * @param keyID {number}
	 * @param operation {KeyOperation}
	 * @param data {AesGcmKeyData}
	 */
	constructor(keyID, operation, data) {
		this.keyID = keyID;
		this.operation = operation;
		this.data = data;
	}

	/**
	 *
	 * @returns {number}
	 */
	getKeyID() {
		return this.keyID;
	}

	/**
	 *
	 * @returns {KeyOperation}
	 */
	getOperation() {
		return this.operation;
	}

	/**
	 *
	 * @returns {KeyData}
	 */
	getData() {
		return this.data;
	}
}

/**
 * @class
 * @implements {KeyData}
 */
class AesGcmKeyData {
	constructor(value, keyMaterialType, version) {
		this.value = value;
		this.keyMaterialType = keyMaterialType;
		this.version = version;
	}

	fromValue() {
		return null;
	}

	/**
	 *
	 * @returns {Uint8Array | Buffer}
	 */
	getValue() {
		return this.value;
	}

	getKeyMaterialType() {
		return this.keyMaterialType;
	}

	/**
	 *
	 * @returns {number}
	 */
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

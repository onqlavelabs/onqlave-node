const { NewConnection } = require("../connection/connection");
const { NewHasher } = require("../utils/hasher");
const { NewRSASSAPKCS1SHAKeyFactory } = require("./factories/rsassapkcs1shafactory");
const { NewRSASSAPKCS1SHA2562048KeyOperation } = require("./operations/rsassapkcs1shaoperation");
const { EncryptionOpenRequest, DecryptionOpenRequest } = require("../contracts/requests/requests");
const { OnqlaveError, ErrorCodes } = require("../errors/errors");
const { Algorithms, KeyManagerClient } = require("./types/types");
const { performance } = require("perf_hooks");

const Resources = {
	ENCRYPT_RESOURCE_URL: "oe2/keymanager/encrypt",
	DECRYPT_RESOURCE_URL: "oe2/keymanager/decrypt"
};

class KeyManager extends KeyManagerClient {
	constructor(configuration, randomService) {
		super();
		const hasher = NewHasher();
		console.log(configuration);
		const httpClient = NewConnection(configuration, hasher, console);
		const rsaSSAPKCS1KeyFactory = NewRSASSAPKCS1SHAKeyFactory(randomService);
		const operations = {
			[Algorithms.RsaSsapkcs12048sha256f4]: NewRSASSAPKCS1SHA2562048KeyOperation(rsaSSAPKCS1KeyFactory)
		};
		this.keyManager = httpClient;
		this.configuration = configuration;
		this.logger = console;
		this.operations = operations;
	}

	async fetchEncryptionKey() {
		const operation = "FetchEncryptionKey";
		const start = performance.now();
		const request = new EncryptionOpenRequest();
		this.logger.log(`[onqlave] SDK: ${operation} - Fetching encryption key`);
		let response;
		try {
			response = await this.keyManager.post(Resources.ENCRYPT_RESOURCE_URL, request);
		} catch (e) {
			throw e;
		}
		const { data_key, wrapping_key, security_model } = response;
		const edk = Buffer.from(data_key.encrypted_data_key, "base64");
		const wdk = data_key.wrapped_data_key;
		const epk = wrapping_key.encrypted_private_key;
		const fp = wrapping_key.key_fingerprint;
		const wrappingAlgorithm = security_model.wrapping_algo;
		const algo  = security_model.algo;
		const dk = await this.unwrapKey(
			wrappingAlgorithm,
			operation,
			wdk,
			epk,
			fp,
			this.configuration.credential.secretKey
		);
		this.logger.info(`[onqlave] SDK: ${operation} - Fetched encryption key: operation took ${performance.now() - start} ms`);
		return { edk, dk, algo };
	}

	async fetchDecryptionKey(edk) {
		const operation = "FetchDecryptionKey";
		const start = performance.now();
		const request = new DecryptionOpenRequest(Buffer.from(edk).toString("base64"));
		this.logger.info(`[onqlave] SDK: ${operation} - Fetching decryption key`);
		let response;
		try {
			response = await this.keyManager.post(Resources.DECRYPT_RESOURCE_URL, request);
		} catch (e) {
			throw e;
		}
		const { data_key, wrapping_key, security_model } = response;
		const wdk = data_key.wrapped_data_key;
		const epk = wrapping_key.encrypted_private_key;
		const fp = wrapping_key.key_fingerprint;
		const wrappingAlgorithm = security_model.wrapping_algo;

		const dk = await this.unwrapKey(
			wrappingAlgorithm,
			operation,
			wdk,
			epk,
			fp,
			this.configuration.credential.secretKey
		);

		this.logger.info(`[onqlave] SDK: ${operation} - Fetched decryption key: operation took ${performance.now() - start} ms`);
		return dk;
	}

	async unwrapKey(wrappingAlgorithm, operation, wdk, epk, fp, password) {
		const wrappingOperation = this.operations[wrappingAlgorithm];
		if (!wrappingOperation) {
			throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, null, `[onqlave] SDK: ${operation} - Invalid wrapping algorithm`);
		}
		const factory = wrappingOperation.getFactory();
		const primitive = await factory.primitive(wrappingOperation);
		if (!primitive) {
			throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, null, `[onqlave] SDK: ${operation} - Invalid wrapping operation`);
		}
		const dk = await primitive.unwrapKey(wdk, epk, fp, password);
		if (!dk) {
			throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, null, `[onqlave] SDK: ${operation} - Failed unwrapping encryption key`);
		}
		return dk;
	}
}


module.exports = {
	KeyManager,
	NewKeyManager: (configuration, randomService) => {
		return new KeyManager(configuration, randomService);
	}
};

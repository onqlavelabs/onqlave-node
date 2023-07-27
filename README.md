# Description
This node SDK is designed to help developers easily integrate Onqlave `Encryption As A Service` into their node backend.

[![CI](https://img.shields.io/static/v1?label=CI&message=passing&color=green?style=plastic&logo=github)](https://github.com/onqlavelabs/onqlave-node/actions)
[![GitHub release](https://badge.fury.io/js/onqlave-node.svg)](https://www.npmjs.com/package/onqlave-node)
[![License](https://img.shields.io/github/license/onqlavelabs/onqlave-node)](https://github.com/onqlavelabs/onqlave-node/blob/main/LICENSE)
# Table of Contents
- [Description](#description)
- [Table of Contents](#table-of-contents)
	- [Features](#features)
	- [Installation](#installation)
		- [Requirements](#requirements)
		- [Configuration](#configuration)
		- [Usage](#usage)
		- [Encrypt](#encrypt)
		- [Decrypt](#decrypt)
		- [Encrypt Stream](#encrypt-stream)
		- [Decrypt Stream](#decrypt-stream)
	- [Reporting a Vulnerability](#reporting-a-vulnerability)
## Features
- Encrypt/Decrypt piece of information
- Encrypt/Decrypt stream of data
## Installation
```sh
npm install @onqlavelabs/onqlave-node
```
### Requirements
- Node 16.0.0 and above

### Configuration

### Usage

To use this SDK, you firstly need to obtain credential to access an Onqlave Arx by signing up to [Onqlave](https://onqlave.com) and following instruction to create your 1st Onqlave Arx.

The [Onqlave Node](https://github.com/onqlavelabs/onqlave-node) module is used to perform operations on the configured ARX such as encrypting, and decrypting for an Onqlave_ARX. [example](https://github.com/onqlavelabs/onqlave-node/blob/main/examples/index.js):

To use this module, the Onqlave client must first be initialized as follows.

```javascript
const {Encryption, Credential, RetrySettings} = require('@onqlavelabs/onqlave-node');
const {createReadStream, createWriteStream} = require('fs');
const config = require('CHANGE_YOUR_CONFIGURATION.json');
```
Add information in the file configuration `.json` following by below:

```json
{
	"accessKey":"",		This is the API Access Key returned of the API Key created during setup. Keep in in a safe place.
	"signingKey": "",	This is the API Signing Key retruned of the API Key created during setup. Keep in in a safe place.
	"secretKey": "",	This is the API Secret Key retruned of the API Key created during setup. Keep in in a safe place.
	"arxURL": "",		This is the Arx URL retruned of the API Key created during setup. Keep in in a safe place.
	"maxRetries": 3,	Number of times to retry calling server endpoints in case of connection issue
	"waitTime": 30,		How long to wait between each retry
	"maxWaitTime": 30,	How long to wait in total for operation to finish
	"debug": false,		Default false - disable debug, true enable debug
}
```
Initial Encryption
````node
const credential = new Credential(config.accessKey, config.signingKey, config.secretKey);
const retrySettings = new RetrySettings(config.maxRetries, config.waitTime, config.maxWaitTime);
// Initial encryption service
const encryptionService = new Encryption(credential, retrySettings, config.arxURL, config.debug);
````

All Onqlave APIs must be invoked using a `Encryption` instance.

### Encrypt

To encrypt data, use the **Encrypt(plainData, associatedData)** method of the `Encryption` service. The **plainText** parameter is the `Buffer` representation of data you are wishing to encrypt. The **associatedData** parameter the `Buffer` representation of associated data which can be used to improve the authenticity of the data (it is not mandatory), as shown below.

```javascript
//Initilise the new encryption service using configurations as per [Usage]
const encryptionService = new Encryption(credential, retrySettings, config.arxURL, config.debug);

const plainData = Buffer.from("This is the plain data");
const additionalData = Buffer.from("This is to authenticated not to encrypt");
const cipherData = await encryptionService.encrypt(plainData, additionalData);
```


### Decrypt
To decrypt data, use the **Decrypt(cipherData, associatedData)** method of the `Encryption` service. The **cipherData** parameter is the `Buffer` representation of data you are wishing to decrypt (previousely encrypted). The **associatedData** parameter the `Buffer` representation of associated data which can be used to improve the authenticity of the data (it is not mandatory), as shown below.

```javascript
//Initilise the new encryption service using configurations as per [Usage]
const encryptionService = new Encryption(credential, retrySettings, config.arxURL, config.debug);

const cipherData = Buffer.from("this data is already encrypted using `Encrypt` method")
const additionalData = Buffer.from("This is to authenticated not to encrypt"); //This can be an arbitrary piece of information you can use to for added security purpose.
const plainData = await encryptionService.Decrypt(cipherData, associatedData);
```

### Encrypt Stream

To encrypt stream of data, use the **encryptStream(plainStream, cipherStream, associatedData)** method of the `Encryption` service. The **plainStream** parameter is the `ReadStream` stream of data you are wishing to encrypt. The **cipherStream** parameter is the `WriteStream` stream you are wishing to write the cipher data to. The **associatedData** parameter the `Buffer` representation of associated data which can be used to improve the authenticity of the data (it is not mandatory), as shown below.


```javascript
//Initilise the new encryption service using configurations as per [Usage]
const encryptionService = new Encryption(credential, retrySettings, config.arxURL, config.debug);
const plainStream = createReadStream("<file or network stream you are wishing to encrypt>", { highWaterMark: 64 * 1024 });
const cipherStream = createWriteStream("<file or network stream you are whishing to stream the encrypted data to>", { encoding: 'binary' });
const associatedData = Buffer.from("this data needs to be authenticated, but not encrypted"); //This can be an arbitrary piece of information you can use to for added security purpose.
await encryptionService.encryptStream(plainStream, cipherStream, additionalData);
plainStream.close();
cipherStream.close();
```


### Decrypt Stream
To decrypt data, use the **decryptStream(cipherStream, plainStream, associatedData)** method of the `Encryption` service. The **cipherStream** parameter is the `ReadStream` stream of data you are wishing to decrypt and it was originally encrypted using [EncryptStream](#encrypt-stream). The **plainStream** parameter is the `WriteStream` stream you are wishing to write the plain data back to. The **associatedData** parameter the `Buffer` representation of associated data which can be used to improve the authenticity of the data (it is not mandatory), as shown below.

```javascript
//Initilise the new encryption service using configurations as per [Usage]
const encryptionService = new Encryption(credential, retrySettings, config.arxURL, config.debug);
const cipherStream = createReadStream("<file or network stream you are wishing to decrypt>", { encoding: 'binary' });
const plainStream = createWriteStream("<file or network stream you are whishing to stream the decrypted data to>", { highWaterMark: 64 * 1024 });
const associatedData = Buffer.from("this data needs to be authenticated, but not encrypted"); //This can be an arbitrary piece of information you can use to for added security purpose.
await encryptionService.decryptStream(cipherStream, plainStream, additionalData);
plainStream.close();
cipherStream.close();
```

## Reporting a Vulnerability

If you discover a potential security issue in this project, please reach out to us at security@onqlave.com. Please do not create public GitHub issues or Pull Requests, as malicious actors could potentially view them.
const { NewClient } = require('./client')
const { OnqlaveError, ErrorCodes } = require('../errors/errors')
const { performance } = require('perf_hooks')

class Configuration {
  constructor(credential, retry, arxUrl, arxId) {
    this.credential = credential;
    this.retry = retry;
    this.arxUrl = arxUrl;
    this.arxId = arxId;
  }
}

class Credential {
  constructor(accessKey, signingKey) {
    this.accessKey = accessKey;
    this.signingKey = signingKey;
  }
}

class Connection {
  constructor(configuration, hasher, logger = console) {
    this.client = NewClient(configuration.retry, logger);
    this.hasher = hasher;
    this.logger = logger;
    this.configuration = configuration;
  }

  async post(resource, body) {
    const operation = 'Post';
    const start = performance.now();
    this.logger.info(`[onqlave] SDK: ${operation} - Sending request started`)
    const urlString = `${this.configuration.arxUrl}/${resource}`;
    const arxId = this.configuration.arxId;
    const now = Math.floor(Date.now() / 1000);
    const content = JSON.stringify(body);
    const contentLen = content.length;
    const digest = await this.hasher.digest(body);
    const headersToSign = {
      'ONQLAVE-API-KEY': this.configuration.credential.accessKey,
      'ONQLAVE-ARX': arxId,
      'ONQLAVE-HOST': this.configuration.arxUrl,
      'User-Agent': 'Onqlave/0.1',
      'ONQLAVE-CONTEXT-LEN': contentLen,
      'ONQLAVE-DIGEST': digest,
      'ONQLAVE-VERSION': '0.1',
    };
    const signature = await this.hasher.sign(headersToSign, this.configuration.credential.signingKey);
    const headers = {
      'Content-Type': 'application/json',
      'ONQLAVE-API-KEY': this.configuration.credential.accessKey,
      'ONQLAVE-ARX': arxId,
      'ONQLAVE-HOST': this.configuration.arxUrl,
      'User-Agent': 'Onqlave/0.1',
      'ONQLAVE-CONTEXT-LEN': contentLen,
      'ONQLAVE-DIGEST': digest,
      'ONQLAVE-VERSION': '0.1',
      'ONQLAVE-REQUEST-TIME': now,
      'ONQLAVE-SIGANTURE': signature,
    };

    try {
      const response = await this.client.post(urlString, body, headers);
      this.logger.info(`[onqlave] SDK: ${operation} - Sending request finished successfully: operation took ${performance.now() - start} ms`)
      return response;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      throw OnqlaveError.newOnqlaveErrorWrapf(ErrorCodes.Server, error, `[onqlave] SDK: ${operation} - Failed sending request`)
    }
  }
}

module.exports = {
  Connection,
  Configuration,
  Credential,
  NewConnection: (configuration, hasher, logger = console) => {
    return new Connection(configuration, hasher, logger = console);
  }
};

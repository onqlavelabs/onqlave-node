'use strict'

const forge = require('node-forge')

class Hasher {
  constructor() { }

  async digest(body) {
    const content = body.getContent();
    const digestHash = forge.md.sha512.create();
    digestHash.update(content);
    const sum = digestHash.digest().getBytes();
    const digest = `SHA512=${Buffer.from(sum, 'binary').toString('base64')}`;
    return digest;
  }

  async sign(headers, signingKey) {
    const signatureHash = forge.hmac.create();
    signatureHash.start('sha512', signingKey);

    const keys = Object.keys(headers)
      .filter((hdrName) => headers[hdrName] !== '')
      .sort();

    for (const hdrName of keys) {
      const input = `${hdrName.toLowerCase()}:${headers[hdrName]}`;
      signatureHash.update(input);
    }

    const sum = signatureHash.digest().getBytes();
    const signature = `HMAC-SHA512=${Buffer.from(sum, 'binary').toString('base64')}`;
    return signature;
  }
}

module.exports = {
  Hasher,
  NewHasher: () => {
    return new Hasher()
  },
};

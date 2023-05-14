const { random } =require('node-forge')

class CPRNGService {
  getRandomBytes(size) {
    return random.getBytesSync(size);
  }

  getRandomUint32() {
    const buf = Buffer.from(this.getRandomBytes(4), 'binary');
    return buf.readUInt32BE(0);
  }
}

module.exports = {
  CPRNGService,
};

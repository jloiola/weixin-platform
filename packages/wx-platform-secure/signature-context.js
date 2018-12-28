const crypto = require('crypto');
const {makeNonce} = require('./common');

class Signature {

  constructor(token) {
    if(!token) {
      throw Error("token is required");
    }

    this.token = token;
  }

  verify(signature, timestamp, nonce, message) {
    const sha1 = crypto.createHash('sha1');
    let contents = [this.token, timestamp, nonce];
    if (message) {
      contents.push(message);
    }
    sha1.update(contents.sort().join(''));
    const digest = sha1.digest('hex');
    return digest === signature;
  }


  create(timestamp, nonce, message) {
    // TODO: timestamp and nonce, should they be internal?
    // const timestamp = Math.ceil(new Date() / 1000)
    // const nonce = makeNonce()
    const sha1 = crypto.createHash('sha1');
    const sortedParts = [this.token, timestamp, nonce, message].sort();
    sha1.update(sortedParts.join(''));
    return sha1.digest('hex');
  }
};

module.exports = Signature;

const crypto = require('crypto');
const {makeNonce} = require('./common');

/**
 *
 */
class SignatureContext {
  /**
   *
   * @param {string} token
   */
  constructor(token) {
    if (!token) {
      throw Error('token is required');
    }
    this.token = token;
  }
  /**
   *
   * @param {string} signature
   * @param {number} timestamp
   * @param {string} nonce
   * @param {string} message
   * @return {boolean} - true if verified signature
   */
  verify(signature, timestamp, nonce, message) {
    const sha1 = crypto.createHash('sha1');
    const contents = [this.token, timestamp, nonce];
    if (message) {
      contents.push(message);
    }
    sha1.update(contents.sort().join(''));
    const digest = sha1.digest('hex');
    return digest === signature;
  }

  /**
   *
   * @param {string} message
   * @return {string} - signed message digest
   */
  create(message) {
    const timestamp = Math.ceil(new Date() / 1000);
    const nonce = makeNonce();
    const sha1 = crypto.createHash('sha1');
    const sortedParts = [this.token, timestamp, nonce, message].sort();
    sha1.update(sortedParts.join(''));
    return sha1.digest('hex');
  }
};

module.exports = SignatureContext;

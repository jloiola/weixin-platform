const crypto = require('crypto');

/**
 *
 */
class Cryptography {
  /**
   *
   * @param {string} appId
   * @param {string} aesEncodingKey
   */
  constructor(appId, aesEncodingKey) {
    if (!appId) {
      throw new Error('appId is required');
    }

    if (!aesEncodingKey) {
      throw new Error('aesEncodingKey is required');
    }

    this.appId = appId;
    this.aesEncodingKey = aesEncodingKey;
    this.aesKey = Buffer.from(`${this.aesEncodingKey}=`, 'base64');
    this.iv = this.aesKey.slice(0, 16);
  }


  /**
   *
   * @param {object} message
   * @param {string} outputEncoding
   * @return {string} - encrypted message with output encoding indicated above
   */
  encrypt(message, outputEncoding='base64') {
    const randomBytes = crypto.pseudoRandomBytes(16);
    const messageBuffer = Buffer.from(message);
    const messageLength = Buffer.from(4).writeUInt32BE(messageBuffer.length, 0);
    const appIdBuffer = Buffer.from(this.appId);
    const payloadBuffer = Buffer.concat([randomBytes, messageLength, messageBuffer, appIdBuffer]);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.aesKey, this.iv);
    cipher.setAutoPadding(true);
    return Buffer.concat([cipher.update(payloadBuffer), cipher.final()]).toString(outputEncoding);
  }

  /**
   *
   * @param {*} message
   * @param {*} outputEncoding
   * @return {string} - decrypted message with output encoding indicated above
   */
  decrypt(message, outputEncoding='utf8') {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.aesKey, this.iv);
    decipher.setAutoPadding(false);
    const decipheredMessage = Buffer.concat([decipher.update(message, 'base64'), decipher.final()]);
    const length = decipheredMessage.slice(16, 20).readUInt32BE(0);
    return decipheredMessage.slice(20, 20 + length).toString(outputEncoding);
  };
}

module.exports = Cryptography;

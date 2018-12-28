const crypto = require('crypto');

class Cryptography {
  constructor(appId, aesEncodingKey) {
    if(!appId) {
      throw new Error('appId is required')
    }

    if(!aesEncodingKey) {
      throw new Error('aesEncodingKey is required')
    }

    this.appId = appId;
    this.aesEncodingKey = aesEncodingKey;
    this.aesKey = new Buffer(`${this.aesEncodingKey}=`, 'base64');
    this.iv = this.aesKey.slice(0, 16);
  }

  // TODO: make more ES6
  // TODO: add JSDOC
  encrypt(message, outputEncoding='base64') {
    var cipher, appIdBuffer, messageBuffer, messageLength, payloadBuffer, randomBytes;
    randomBytes = crypto.pseudoRandomBytes(16);
    messageBuffer = new Buffer(message);
    messageLength = new Buffer(4);
    messageLength.writeUInt32BE(messageBuffer.length, 0);
    appIdBuffer = new Buffer(this.appId);
    payloadBuffer = Buffer.concat([randomBytes, messageLength, messageBuffer, appIdBuffer]);
    cipher = crypto.createCipheriv('aes-256-cbc', this.aesKey, this.iv);
    cipher.setAutoPadding(true);
    return Buffer.concat([cipher.update(payloadBuffer), cipher.final()]).toString(outputEncoding);
  }

  // TODO: make more ES6
  // TODO: add JSDOC
  decrypt(message, outputEncoding='utf8') {
    var decipher, decipheredMessage, length, message;
    decipher = crypto.createDecipheriv('aes-256-cbc', this.aesKey, this.iv);
    decipher.setAutoPadding(false);
    decipheredMessage = Buffer.concat([decipher.update(message, 'base64'), decipher.final()]);
    length = decipheredMessage.slice(16, 20).readUInt32BE(0);
    message = decipheredMessage.slice(20, 20 + length);
    return message.toString(outputEncoding);
  };
}

module.exports = Cryptography;

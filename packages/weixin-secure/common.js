

const crypto = require('crypto');

const makeNonce = (nonceLength=10) => (
  crypto.pseudoRandomBytes(nonceLength).toString('hex')
);

module.exports = {makeNonce};

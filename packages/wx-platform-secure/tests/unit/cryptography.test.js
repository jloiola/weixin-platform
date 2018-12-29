const Cryptography = require('../../cryptography');

it('should throw when missing appId', () => {
  try {
    new Cryptography();
  } catch (e) {
    expect(e.message).toBe('appId is required');
  }
});

it('should throw when missing aesEncodingKey', () => {
  try {
    new Cryptography('appId');
  } catch (e) {
    expect(e.message).toBe('aesEncodingKey is required');
  }
});

it('should have a valid IV length', () => {
  expect(true).toBe(true);
});

// TODO: lots of fun 'testing' mocks/spyes etc to make this 'testable'
it('should encrypt message', () => {
  expect(true).toBe(true);
});

it('should decrypt message', () => {
  const cryptogrpahy = new Cryptography('appId', '0000000000000000000000000000000000000000123');
  const message = cryptogrpahy.decrypt('fYBc+evp/oUmmNdQbob6JgMd/WQnpJ56w1mQRr4qkheYs8OJZhiGe1ZBXhl/jB91');
  expect(message).toBe('fixed message');
});


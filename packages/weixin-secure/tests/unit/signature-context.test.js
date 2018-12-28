const SignatureContext = require('../../signature-context');

it('should throw when missing token', () => {
  try {
    new SignatureContext();
  } catch (e) {
    expect(e.message).toBe('token is required');
  }
});

// TODO re-org for shared context/vars
it('should create signature', () => {
    const signatureCtx = new SignatureContext('arandomtoken');

    const timestamp = 1546024887;
    const nonce = '0836e760a83d6e796c7f';
    const message = 'weixin message';

    const signature = signatureCtx.create(timestamp, nonce, message)
    expect(signature).toBe('12d1cbe0127713098482526286faaccef3556b1c');
});

// TODO re-org for shared context/vars
it('should verify signature', () => {
  const signatureCtx = new SignatureContext('arandomtoken');

  const signature = '12d1cbe0127713098482526286faaccef3556b1c';
  const timestamp = 1546024887;
  const nonce = '0836e760a83d6e796c7f';
  const message = 'weixin message';

  const verify = signatureCtx.verify(signature, timestamp, nonce, message);
  expect(verify).toBe(true);
});

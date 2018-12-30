const express = require('express');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const app = express();
const {parseXml, MessageRouter} = require('./middleware');
const {SignatureContext, Cryptography} = require('@weixin-platform/secure');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.xml({
  xmlParseOptions: {
    normalize: true,
    normalizeTags: false,
    explicitArray: false,
  },
}));

module.exports = ({token, appId, aesEncodingKey, routeDefintions}) => {
  const signatureCtx = new SignatureContext(token);
  const crypto = new Cryptography(appId, aesEncodingKey);

  app.get('/', (req, res) => {
    const {signature, timestamp, nonce} = req.query;
    const message = req.query.echostr;
    if (signatureCtx.verify(signature, timestamp, nonce, message)) {
      req.decryptedXml = crypto.decrypt(message);
      return res.end(req.decryptedXml);
    } else {
      // TODO what ... to do?
      return res.sendStatus(500);
    }
  });

  // TODO maybe use compose
  app.post('/',
      // 1
      (req, res, next) => {
        // eslint-disable-next-line camelcase
        const {msg_signature, timestamp, nonce} = req.query;
        const message = req.body.xml.Encrypt;
        if (signatureCtx.verify(msg_signature, timestamp, nonce, message)) {
          req.decryptedXml = crypto.decrypt(message);
          return next();
        } else {
          return res.sendStatus(403);
        }
      },
      // 2
      parseXml,
      // 3
      new MessageRouter(routeDefintions)
  );

  return app;
};

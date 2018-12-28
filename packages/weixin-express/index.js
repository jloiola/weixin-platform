const express = require('express');
const app = express();
const {parseXml, messageRouter} = require('./middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.xml({
  xmlParseOptions: {
    normalize: true,
    normalizeTags: false,
    explicitArray: false,
  }
}));

module.exports = ({token, appId, aesEncodingKey, routeDefintions}) => {

  const signatureCtx = new SignatureContext(token);
  const crypto = new Cryptography(appId, aesEncodingKey);

  router.get('/', (req, res) => {
    const [signature, timestamp, nonce] = req.query;
    const message = req.query.echostr;
    if(signatureCtx.verify(signature, timestamp, nonce, message)) {
      req.decryptedXml = crypto.decrypt(message);
      return res.end(req.decryptedXml)
    } else {
      // TODO what ... to do?
      return res.sendStatus(500);
    }
  });

  // TODO maybe use compose
  router.post('/',
    // 1
    (req, res, next) => {
      const [msg_signature, timestamp, nonce] = req.query;
      const message = req.body.xml.Encrypt;
      if(signatureCtx.verify(msg_signature, timestamp, nonce, message)) {
        req.decryptedXml = crypto.decrypt(message);
        return next();
      } else {
        return res.sendStatus(403);
      }
    },
    // 2
    parseXml,
    // 3
    messageRouter(routeDefintions)
  );

  return app;
};

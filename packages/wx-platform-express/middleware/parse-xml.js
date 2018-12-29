const xml2js = require('xml2js');

module.exports = (req, res, next) => {
  const parser = new xml2js.Parser({
    normalize: true,
    normalizeTags: false,
    explicitArray: false,
  });

  return parser.parseString(req.decryptedXml, function(err, xml) {
    if (err) {
      return next(err);
    }
    req.isEncrypted = true;
    req.envelope = req.body;
    req.body = xml;
    return next();
  });
};

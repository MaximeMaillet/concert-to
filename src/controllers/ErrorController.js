module.exports.notFoundError = (req, res, next) => {
  res.send('no problem');
};

module.exports.internalError = (req, res, next) => {
  res.send('gros problem');
};
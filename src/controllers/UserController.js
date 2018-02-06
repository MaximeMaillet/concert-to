const helper = require('../helpers');

module.exports.get = async(req, res, next) => {
  if(!req.session || !req.session.user) {
    return res.status(401).send();
  }

  res.send((await helper.getUser(req)));
};
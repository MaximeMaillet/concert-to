'use strict';

module.exports.get = (req, res, next) => {
  if(!req.session || !req.session.user) {
    return res.status(401).send();
  }
  res.send(req.session.user);
};
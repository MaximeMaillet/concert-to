'use strict';

module.exports.run = (req, res, next) => {
  if(!req.session || !req.session.user) {
    return res.sendStatus(401);
  } else {
    next();
  }
};
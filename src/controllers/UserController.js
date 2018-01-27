'use strict';

module.exports.get = (req, res, next) => {
  console.log(req.universalCookies.getAll());
  console.log(req.session);
  res.send(req.session.user);
};
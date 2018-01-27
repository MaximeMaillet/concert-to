'use strict';

module.exports.connect = (req, res, next) => {
  console.log(req.session);
  req.session.user = {
    name: req.body.username,
  };
  console.log(req.session);
  res.send(req.session.user);
};

module.exports.disconnect = (req, res, next) => {
  req.session.user = null;
  res.sendStatus(200);
};
'use strict';

module.exports.get = (req, res, next) => {
  res.send({
    ctrl: 'coucou',
    user: req.session.user
  });
};
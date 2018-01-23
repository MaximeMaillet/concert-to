'use strict';

module.exports.use = (req, res, next) => {
  if(req.session && req.session.user) {
    return res.redirect('/user');
  }

  next();
};
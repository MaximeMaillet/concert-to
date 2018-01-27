const User = require('../models').user;

module.exports.connect = async(req, res, next) => {

  try {
    const user = await User.create({
      email: req.body.username,
      password: req.body.password,
      username: req.body.username,
    });

    res.send(user);
  }
  catch(err) {
    next(err);
  }
};

module.exports.disconnect = (req, res, next) => {
  req.session.user = null;
  res.sendStatus(200);
};
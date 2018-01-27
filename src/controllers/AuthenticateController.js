const User = require('../models').user;

async function connect(req, res, next) {


}

function disconnect(req, res, next) {
  req.session.user = null;
  res.sendStatus(200);
}

async function registration(req, res, next) {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });

    req.session.user = user;
    res.send(user);
  }
  catch(err) {
    next(err);
  }
}

module.exports = {
  connect,
  disconnect,
  registration,
};
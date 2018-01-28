const User = require('../models').user;

async function connect(req, res, next) {
  const {email, password} = req.body;

  try {
    const user = await User
      .findOne({where: {email}})
      .then((user) => {

        if (!user || !user.isValidPassword(user.password, password)) {
          next({message:'Authenticate failed', status:401});
        }
        else {
          return user;
        }
      });

    delete user.password;
    req.session.user = user;
    res.send(user);
  } catch(err) {
    next(err);
  }
}

async function registration(req, res, next) {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });

    delete user.password;
    req.session.user = user;
    res.send(user);
  }
  catch(err) {
    next(err);
  }
}

function disconnect(req, res, next) {
  req.session.user = null;
  res.sendStatus(200);
}

module.exports = {
  connect,
  registration,
  disconnect,
};
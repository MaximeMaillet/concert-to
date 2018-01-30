const {user: User} = require('../models');

async function getUser(req) {
  if(req && req.session && req.session.user) {
    return User.findOne({
      where: {id: req.session.user.id}
    });
  } else {
    throw new Error('User is not connected');
  }
}

module.exports = {
  getUser,
};
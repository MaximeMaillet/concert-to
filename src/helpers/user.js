const {user: User, artist: Artist} = require('../models');

async function getUser(req) {
  if(req && req.session && req.session.user) {
    return User.findOne({
      where: {id: req.session.user.id},
      include: [
        {model: Artist, as: 'Likes'}
      ]
    });
  } else {
    throw new Error('User is not connected');
  }
}

module.exports = {
  getUser,
};
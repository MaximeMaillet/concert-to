const {artist: Artist, event: Event, user: User} = require('../models');
const { getUser } = require('../helpers');

function get(req, res, next) {
  res.send('ok');
}

async function like(req, res, next) {
  try {
    const artist = await Artist.findOne({
      where: {id: req.params.id},
    });

    if(artist) {
      const user = await getUser(req);
      user.addLikes(artist);
      res.send();
    }
  } catch(e) {
    next(e);
  }
}

async function dislike(req, res, next) {
  try {
    const artist = await Artist.findOne({
      where: {id: req.params.id},
    });

    if(artist) {
      const user = await getUser(req);
      user.removeLikes(artist);
      res.send();
    }
  } catch(e) {
    next(e);
  }
}

module.exports = {
  get,
  like,
  dislike,
};
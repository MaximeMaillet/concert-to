const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Artist = require('../models').artist;

async function artist(req, res, next) {
  console.log('Search');
  console.log(req.body.search);

  try {

    const artists = await Artist
      .findAll({
        where: {
          name: {
            [Op.like]: `%${req.body.search}%`
          }
        },
        raw: true,
      });

    if(artists && artists.length > 0) {
      res.send(artists);
    } else {
      res.status(404).send({
        'message': 'No result found'
      });
    }
  } catch(err) {
    next(err);
  }
};

module.exports = {
  artist,
};
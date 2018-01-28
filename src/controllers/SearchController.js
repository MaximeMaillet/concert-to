require('dotenv').config();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Artist = require('../models').artist;
const rp = require('request-promise');

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
      console.log(`${process.env.SCRAPPER_HOST}:${process.env.SCRAPPER_PORT}`);
      rp({
        uri: `http://${process.env.SCRAPPER_HOST}:${process.env.SCRAPPER_PORT}/hook/artist/scrap`,
        method: 'POST',
        body: {
          name: req.body.search
        },
        json: true
      }).then((r) => {
        console.log(r);
      })
        .catch((err) => {
          console.log(err);
        })
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
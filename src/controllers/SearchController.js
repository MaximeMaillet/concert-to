require('dotenv').config();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {artist: Artist, event: Event} = require('../models');
const rp = require('request-promise');

async function artist(req, res, next) {
  try {

    // if (req.body.search === undefined) {
    //
    // }

    console.log(req.body.search);

    const artists = await Artist
      .findAll({
        where: {
          name: {
            [Op.like]: `%${req.body.search}%`
          }
        },
        include: [{as: 'Events', separate: true, model: Event}],
      });

    if(artists && artists.length > 0) {
      const dataIds = [];
      const data = [];
      for(const i in artists) {
        if(dataIds.indexOf(artists[i].id) === -1) {
          dataIds.push(artists[i].id);
          data.push(artists[i]);
        }
      }

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
      })
        .then((r) => {
          console.log(r);
        })
        .catch((err) => {
          console.log(err.message);
        });

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
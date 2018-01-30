require('dotenv').config();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {artist: Artist, event: Event} = require('../models');
const helper = require('../helpers');

async function artist(req, res, next) {
  try {
    const result = await helper.searchArtist(req.body.search);

    if(result.length > 0) {
      res.send(result);
    } else {
      helper.scrap({
        name: req.body.search
      });

      res.status(404).send({
        'message': 'No result found'
      });
    }
  } catch(err) {
    next(err);
  }
}

module.exports = {
  artist,
};
require('dotenv').config();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {artist: Artist, event: Event} = require('../models');
const helper = require('../helpers');

async function artist(req, res, next) {
  try {

    // if (req.body.search === undefined) {
    //
    // }

    const artists = [];

    const result = await helper.searchArtist(req.body.search);
    console.log(result);
    res.send(result);


    // console.log(req.body.search);
    //
    // const artists = await Artist
    //   .findAll({
    //     where: {
    //       name: {
    //         [Op.like]: `%${req.body.search}%`
    //       }
    //     },
    //     include: [{as: 'Events', separate: true, model: Event}],
    //   });
    //
    // if(artists && artists.length > 0) {
    //   const dataIds = [];
    //   const data = [];
    //   for(const i in artists) {
    //     if(dataIds.indexOf(artists[i].id) === -1) {
    //       dataIds.push(artists[i].id);
    //       data.push(artists[i]);
    //     }
    //   }
    // } else {
    //   // helper.scrap({
    //   //   name: req.body.search
    //   // });
    //   res.status(404).send({
    //     'message': 'No result found'
    //   });
    // }
  } catch(err) {
    next(err);
  }
};

module.exports = {
  artist,
};
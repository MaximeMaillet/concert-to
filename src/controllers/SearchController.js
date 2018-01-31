require('dotenv').config();

const helper = require('../helpers');
const transformer = require('../transformers/artist');

async function artist(req, res, next) {
  try {
    if(!req.body.search) {
      req.body.search = '';
    } else {
      helper.scrap({
        name: req.body.search
      });
    }

    const result = await helper.searchArtist({
      from: req.body.from,
      size: req.body.size,
      term: req.body.search
    });

    if(result.length > 0) {
      res.send(transformer.transform(result, 'user'));
    } else {
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
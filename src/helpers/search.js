const elasticsearch = require('elasticsearch');
const {artist: Artist, event: Event} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const transformer = require('../transformers/artist');

const client = new elasticsearch.Client({
  host: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
  // log: 'trace'
});

module.exports = {
  searchArtist,
};

function searchArtist(term) {
  return new Promise((resolve, reject) => {
    client.search(getSearch(term), (err, res) => {
      if(err) {
        reject(err);
      } else {

        const arrayIds = [];
        if(res.hits.total === 0) {
          resolve([]);
        } else {
          const data = res.hits.hits[0]._source;

          if(Array.isArray(data)) {
            for(const i in data) {
              arrayIds.push(data[i].id);
            }
          } else {
            arrayIds.push(data.id);
          }

          return Artist.findAll({
            where: {
              id: {
                [Op.in]: arrayIds
              }
            },
            include: [{as: 'events', separate: true, model: Event}],
          })
            .then((artist) => {
              resolve(transformer.transform(artist, 'user'));
            });
        }
      }
    });
  });
}

function getSearch(term) {
  return {
    index: 'concerto',
    type: 'artist',
    body: {
      query: {
        bool: {
          must: [
            {
              match: {name: term}
            }
          ]
        }
      }
    }
  };
}
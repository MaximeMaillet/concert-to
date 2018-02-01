const elasticsearch = require('elasticsearch');
const {artist: Artist, event: Event, location: Location} = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const client = new elasticsearch.Client({
  host: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
  log: 'trace'
});

module.exports = {
  searchArtist,
};

function searchArtist(query) {
  return new Promise((resolve, reject) => {
    client.search(getSearch(query), (err, res) => {
      if(err) {
        reject(err);
      } else {

        const arrayIds = [];
        if(res.hits.total === 0) {
          resolve([]);
        } else {
          const {hits} = res.hits;

          for(const i in hits) {
            arrayIds.push(hits[i]._source.id);
          }

          return Artist.findAll({
            where: {
              id: {
                [Op.in]: arrayIds
              }
            },
            include: [{
              as: 'events',
              separate: true,
              model: Event,
              include: [{model: Location, as:'location'}]
            }],
          })
            .then((result) => {
              resolve(result);
            });
        }
      }
    });
  });
}

function getSearch(query) {
  console.log(query);
  query = defaultQuery(query);
  const musts = [];

  if(query.term) {
    musts.push(addTerm(query.term));
  }

  return {
    index: 'concerto',
    type: 'artist',
    body: flatten({
      from: query.from,
      size: query.size,
      query: {
        bool: {
          must: musts
        }
      }
    })
  };
}

function addTerm(term) {
  return {
    match: {name: term}
  };
}

function flatten(query) {
  if(query.query.bool.must.length === 0) {
    delete query.query;
  }

  return query;
}

function defaultQuery(query) {
  if(!query.from) {
    query.from = 0;
  }

  if(!query.size) {
    query.size = 30;
  }

  return query;
}
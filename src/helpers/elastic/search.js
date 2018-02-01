const elasticsearch = require('elasticsearch');
const {artist: Artist, event: Event, location: Location} = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let currentUser = null;

const client = new elasticsearch.Client({
  host: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
  log: 'trace'
});

module.exports = {
  searchArtist,
};

function searchArtist(user, query) {
  currentUser = user;
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
          const arrayReturn = hits.map((key) => {
            arrayIds.push(key._source.id);
            return key._source;
          });

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
              for(const i in result) {
                for(const j in arrayReturn) {
                  if(arrayReturn[j].id === result[i].id) {
                    arrayReturn[j] = result[i];
                  }
                }
              }
              resolve(arrayReturn);
            });
        }
      }
    });
  });
}

function getSearch(_query) {
  const {query, shoulds} = defaultQuery(_query);
  const musts = [];

  if(query.term) {
    musts.push(addTerm(query.term));
  }

  console.log(shoulds);

  shoulds.push({
    match: {
      likes: {
        query: currentUser.id,
        boost: 1.0,
      },
    }
  });
  shoulds.push(addRange({events_count: {gte: 10, boost: 0.5}}));

  return {
    index: 'concerto',
    type: 'artist',
    body: flatten({
      min_score: 0,
      from: query.from,
      size: query.size,
      query: {
        bool: {
          must: musts,
          should: shoulds,
        },
      },
    })
  };
}

function addTerm(term) {
  return {
    match: {name: term}
  };
}

function addRange(range) {
  return {
    range: range
  };
}

function flatten(query) {
  return query;
}

function defaultQuery(query) {
  if(!query.from) {
    query.from = 0;
  }

  if(!query.size) {
    query.size = 30;
  }


  if(!query.sort) {
    query.sort = [
      {
        events_count: {
          order: 'desc',
        }
      },
      {
        likes_count: {
          order: 'desc',
        }
      }
    ];
  }

  const shoulds = [];
  shoulds.push(addRange({events_count: {gte: 2, boost: 0.3}}));
  shoulds.push(addRange({likes_count: {gte: 2, boost: 0.2}}));

  return {query, shoulds};
}
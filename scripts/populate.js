require('dotenv').config();
console.log('Populating Elasticsearch');

const artistTransformer = require('../src/transformers/artist');
const db = require('../src/models');
const Artist = db.artist;

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
  // log: 'trace'
});

start('concerto', 'artist')
  .then(() => {
    console.log('Done populating');
    process.exit();
  });

async function start(index, type) {

  try {
    await deleteIndex(index);
  } catch(e) {}

  try {
    await createIndice(index, type);
    await createSettings(index);
    await createMapping(index, type);
    const data = await getData();
    console.log(`Data fetched : ${data.length}`);
    await bulkData(index,type, data);
  } catch(e) {
    console.log(e);
  }
}

/**
 * Get data from Database
 * @return {Promise.<TResult>}
 */
async function getData() {
  console.log('Fetch data');
  const artists = await Artist.findAll({
    include: [
      {
        model: db.sequelize.models.event,
        as: 'events',
        separate: true,
        include: [
          {
            model: db.sequelize.models.location,
            as: 'location',
            raw: true
          }
        ]
      }
    ]
  });

  for(const i in artists) {
    artists[i].dataValues.likes = await artists[i].getLikes({
      attributes: ['id'],
      joinTableAttributes: [],
      raw: true
    }).then((res) => {
      const array = [];
      for(const i in res) {
        array.push(res[i].id);
      }
      return array;
    });

    console.log(artists[i].dataValues.likes);
  }

  return artistTransformer.transform(artists, 'es');
}

/**
 * Delete index
 * @param index
 * @return {Promise}
 */
function deleteIndex(index) {
  console.log('Delete index');
  return new Promise((resolve, reject) => {
    client.indices.delete({
      index,
    }, (err, res) => {
      if(err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

/**
 * Create index
 * @param index
 * @param type
 * @return {Promise}
 */
function createIndice(index, type) {
  console.log('Create index');
  return new Promise((resolve, reject) => {
    client.indices.create({
      index
    }, (err,resp) => {
      if(err) {
        reject(err);
      }
      else {
        resolve(resp);
      }
    });
  });
}

/**
 * Create mapping
 * @param index
 * @param type
 * @return {Promise}
 */
function createMapping(index, type) {
  console.log('Create mapping');
  return new Promise((resolve, reject) => {
    client.indices.putMapping({
      index,
      type,
      body: {
        properties: {
          id: {type: 'integer'},
          name: {
            'analyzer': 'my_analyzer',
            type: 'text',
          },
          events_count: {
            type: 'integer',
          },
          likes_count: {
            type: 'integer',
          },
          events: {
            type: 'nested',
            properties: {
              id: {type: 'integer'},
              name: {type: 'text'},
              date_start: {type: 'date'},
              date_end: {type: 'date'},
              location: {
                type: 'nested',
                properties: {
                  name: {type: 'text'},
                  address: {type: 'text'},
                  cp: {type: 'text'},
                  city: {type: 'text'},
                  country: {type: 'text'},
                  geoloc: {type: 'geo_point'}
                }
              },
            }
          }
        }
      }
    }, (err, resp) => {
      if(err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
}

/**
 * Post data in ES
 * @param index
 * @param type
 * @param body
 * @return {Promise}
 */
function bulkData(index, type, body) {
  console.log('Insert data');
  return new Promise((resolve, reject) => {
    const bulk = [];
    for(const i in body) {
      body[i].events_count = body[i].events.length;
      bulk.push(
        {index: {_index: index, _type: type, _id: i+1}},
        body[i],
      );
    }

    client.bulk({body: bulk},
      (err, res) => {
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}

/**
 * Create settings like analyzer
 * @param index
 * @return {Promise}
 */
function createSettings(index) {
  console.log('Create settings');
  return new Promise((resolve, reject) => {
    client.indices.close({
      index
    }, (err, resp) => {
      client.indices.putSettings({
        index,
        body: {
          'settings': {
            'analysis': {
              'analyzer': {
                'my_analyzer': {
                  'tokenizer': 'my_tokenizer',
                  'filter': ['lowercase']
                }
              },
              'tokenizer': {
                'my_tokenizer': {
                  'type': 'edge_ngram',
                  'min_gram': 4,
                  'max_gram': 12,
                  'token_chars': [
                    'letter',
                    'digit'
                  ]
                }
              }
            }
          }
        }
      }, (err, resp) => {
        client.indices.open({index}, (err, resp) => {
          if(err) {
            reject(err);
          } else {
            resolve(resp);
          }
        });
      });
    });
  });
}
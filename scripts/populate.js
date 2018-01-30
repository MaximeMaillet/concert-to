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

start()
  .then(() => {
    console.log('Done populating');
    process.exit();
  });

async function start() {

  try {
    console.log('Delete index');
    await deleteIndex('concerto');
    console.log('Create index');
    await createIndice('concerto', 'artist');
    console.log('Fetch data');
    const data = await getData();
    console.log(`Data fetched : ${data.length}`);
    console.log('Insert data');
    await bulkData('concerto','artist', data);
  } catch(e) {
    console.log(e);
  }
}

/**
 * Get data from Database
 * @return {Promise.<TResult>}
 */
async function getData() {
  return await Artist.findAll({
    include: {
      model: db.sequelize.models.event,
      as: 'events',
      separate: true,
      include: {
        model: db.sequelize.models.location,
        as: 'location',
        raw: true
      }
    },
  })
    .then((artist) => {
      return artistTransformer.transform(artist, 'es');
    });
}

/**
 * Delete index
 * @param index
 * @return {Promise}
 */
function deleteIndex(index) {
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
 * Create index + mapping
 * @param index
 * @param type
 * @return {Promise}
 */
function createIndice(index, type) {
  return new Promise((resolve, reject) => {
    client.indices.create({
      index
    }, (err,resp) => {
      if(err) {
        reject(err);
      }
      else {
        client.indices.putMapping({
          index,
          type,
          body: {
            properties: {
              id: {type: 'integer'},
              name: {
                type: 'text',
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
  return new Promise((resolve, reject) => {
    const bulk = [];
    for(const i in body) {
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
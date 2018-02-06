require('dotenv').config();
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
  // log: 'trace'
});

function addArtistLike(artistId, userId) {
  return new Promise((resolve, reject) => {
    client.updateByQuery({
      index: 'concerto',
      type: 'artist',
      body: {
        query: {
          match: {
            id: artistId
          }
        },
        script: {
          inline: 'ctx._source.likes_count++; ctx._source.likes.add(params.like)',
          params: {
            like: userId
          }
        },
      }
    }, (err, res) => {
      if(err) {
        reject(err);
      }

      console.log(res.error);
      resolve(res);
    });
  });
}

function removeArtistLike(artistId, userId) {
  return new Promise((resolve, reject) => {
    client.updateByQuery({
      index: 'concerto',
      type: 'artist',
      body: {
        query: {
          match: {
            id: artistId
          }
        },
        script: {
          inline: 'ctx._source.likes_count--; ctx._source.likes.remove(ctx._source.likes.indexOf(params.like))',
          params: {
            like: userId
          }
        },
      }
    }, (err, res) => {
      if(err) {
        reject(err);
      }

      resolve(res);
    });
  });
}

module.exports = {
  addArtistLike,
  removeArtistLike,
};

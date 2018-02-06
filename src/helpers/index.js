const {searchArtist, hook} = require('./elastic/index');

module.exports = {
  getUser: require('./user').getUser,
  scrap: require('./scrapper').scrap,
  searchArtist: searchArtist,
  elasticHook: hook,
};
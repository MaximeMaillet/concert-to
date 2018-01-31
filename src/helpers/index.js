module.exports = {
  getUser: require('./user').getUser,
  scrap: require('./scrapper').scrap,
  searchArtist: require('./elastic/search').searchArtist,
};
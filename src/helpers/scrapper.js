require('dotenv').config();
const rp = require('request-promise');

module.exports = {
  scrap,
};

async function scrap(body) {
  console.log(`${process.env.SCRAPPER_HOST}:${process.env.SCRAPPER_PORT}`);
  return await rp({
    uri: `http://${process.env.SCRAPPER_HOST}:${process.env.SCRAPPER_PORT}/hook/artist/scrap`,
    method: 'POST',
    body: body,
    json: true
  })
    .catch((err) => {
      console.log(err);
    });
}
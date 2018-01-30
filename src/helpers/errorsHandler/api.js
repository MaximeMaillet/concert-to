require('dotenv').config();

module.exports = (req, res, next) => {

  return res.status(500).send('Error from api');
};
require('dotenv').config();

const cors = require('cors');
const whiteList = process.env.CORS_DOMAIN.split(',');
const corsOptions = {
  origin: whiteList,
  optionsSuccessStatus: 200,
  methods: ['GET', 'PATCH', 'POST'],
  credentials: true,
};

module.exports.use = cors(corsOptions);
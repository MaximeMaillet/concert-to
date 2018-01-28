
require('dotenv').config();

const fs = require('fs');
const uuidv4 = require('uuid/v4');
const session = require('express-session');
var FileStore = require('session-file-store')(session);

const options = {
  path: 'sessions',
  expiryDate: new Date( Date.now() + 60 * 60 * 1000 * 24 * 30),
};

module.exports.use = session({
  secret: 'mySecret',
  cookie: { httpOnly: false },
  saveUninitialized: true,
  resave: false,
  store: new FileStore(options),
});
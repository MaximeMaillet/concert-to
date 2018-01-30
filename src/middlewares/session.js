
require('dotenv').config();

const fs = require('fs');
const uuidv4 = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const options = {
  path: 'sessions',
  expiryDate: new Date( Date.now() + 60 * 60 * 1000 * 24 * 30),
};

module.exports.use = session({
  secret: 'mySecret',
  cookie: {
    httpOnly: false,
    maxAge: new Date( Date.now() + 60 * 60 * 1000 * 24 * 30),
  },
  saveUninitialized: true,
  resave: true,
  store: new FileStore(options),
});
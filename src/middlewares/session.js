'use strict';
require('dotenv').config();

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const options = {
  path: './sessions'
};

module.exports.use = (app) => {
  app.use(session({
    secret: 'MyS3cr37P4ssW0rdF0rS$ssL0n',
    saveUninitialized: true,
    store: new FileStore(options),
    resave: false,
    proxy: true
  }));
};
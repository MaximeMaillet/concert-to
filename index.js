require('dotenv').config();

const express = require('express');
const Router = require('express-imp-router');

const app = express();

Router(app);

Router.route([
  {
    routes: `${__dirname}/src/config/routes.json`,
    controllers: `${__dirname}/src/controllers`,
  }
]);

app.listen(process.env.API_PORT);
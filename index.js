require('dotenv').config();

const express = require('express');
const Router = require('express-imp-router');
const bodyParser = require('body-parser');
const cookiesMiddleware = require('universal-cookie-express');

const db = require('./src/models');

// db.sequelize.sync({
//   alter: true,
// })
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const app = express();
app.use(bodyParser.json());
app.use(cookiesMiddleware());
app.use(bodyParser.urlencoded({ extended: false }));

Router(app);

Router.route([
  {
    routes: `${__dirname}/src/config/routes.json`,
    controllers: `${__dirname}/src/controllers`,
    middlewares: `${__dirname}/src/middlewares`,
    errorHandler: `${__dirname}/src/helpers/errorsHandler`,
  }
]);

console.log(`Api launch on ${process.env.API_PORT}`);
app.listen(process.env.API_PORT);
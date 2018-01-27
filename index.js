require('dotenv').config();

const express = require('express');
const Router = require('express-imp-router');
const bodyParser = require('body-parser');
const cookiesMiddleware = require('universal-cookie-express');

const app = express();
app.use(bodyParser.json());
app.use(cookiesMiddleware());

const ses = require('./src/middlewares/session');
// app.use(ses.use);

// "_middleware": [
//   {
//     "target": ["/"],
//     "action": [
//       "../middlewares/cors#use",
//       "../middlewares/session#use"
//     ]
//   },
//   {
//     "target": ["/authenticate"],
//     "action": [
//       "../middlewares/alreadyConnected#use"
//     ]
//   }
// ],

Router(app);

Router.route([
  {
    routes: `${__dirname}/src/config/routes.json`,
    controllers: `${__dirname}/src/controllers`,
  }
]);

app.listen(process.env.API_PORT);
import axios from 'axios';

const routes = require('../../config/routes.json');
const calls = {};

Object.keys(routes).map((key) => {
  parseRoute(key, routes[key]);
});

function parseRoute(route, config) {
  if(!route.startsWith('_')) {
    Object.keys(config).map((key) => {
      if(key.startsWith('/')) {
        parseRoute(route+key, config[key]);
      } else {
        calls[route.replace(/\//g, '.').substr(1)] = (_params) => {
          let data = {};
          if(key.toLowerCase() === 'get') {
            data = {
              params: _params
            };
          } else {
            data = {
              data: _params
            };
          }

          return axios.request(Object.assign({
            url: `${API_URL}:${API_PORT}${route}`,
            method: key,
            withCredentials: true,
          }, data));
        };
      }
    });
  }
}

export default calls;
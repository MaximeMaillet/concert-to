import axios from 'axios';

const routes = [
  {
    name: 'user',
    route: '/user',
    method: 'get'
  },
  {
    name: 'authenticate',
    route: '/authenticate',
    method: 'post'
  },
  {
    name: 'registration',
    route: '/registration',
    method: 'post'
  },
  {
    name: 'search',
    route: '/search',
    method: 'post'
  },
  {
    name: 'logout',
    route: '/logout',
    method: 'get'
  }
];

const calls = {};

for(const i in routes) {
  calls[routes[i].name] = function(_params) {
    let data = {};
    if (_params) {
      if (routes[i].route.toLowerCase() === 'get') {
        data = {
          params: _params
        };
      } else {
        data = {
          data: _params
        };
      }
    }

    return axios.request(Object.assign({
      url: `${API_URL}${routes[i].route}`,
      method: routes[i].method,
      withCredentials: true,
    }, data));
  };
}

export default calls;
import axios from 'axios';
import get from 'lodash.get';

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
  },
  {
    name: 'like',
    route: '/artists/:id/likes',
    method: 'get'
  }
];

const calls = {};

for(const i in routes) {
  calls[routes[i].name] = (slug, params) => {
    console.log(slug, params);
    const regex = /:([a-z_]+)(\([^\)]+\))?(\??)/ig;
    if(regex.test(routes[i].route)) {
      const matchs = routes[i].route.match(regex);
      for(const j in matchs) {
        routes[i].route = routes[i].route.replace(regex, get(slug, matchs[j].substr(1)));
      }
    }

    if(!params) {
      params = slug;
    }

    let data = {};
    if (params) {
      if (routes[i].route.toLowerCase() === 'get') {
        data = {
          params: params
        };
      } else {
        data = {
          data: params
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
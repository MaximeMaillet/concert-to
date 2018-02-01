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
    let route = routes[i].route;
    const regex = new RegExp(/:([a-z_]+)(\([^\)]+\))?(\??)/ig);
    if(regex.test(route)) {
      const matchs = route.match(regex);
      for(const j in matchs) {
        route = route.replace(regex, get(slug, matchs[j].substr(1)));
      }
    }

    if(!params) {
      params = slug;
    }

    let data = {};
    if (params) {
      if (route.toLowerCase() === 'get') {
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
      url: `${API_URL}${route}`,
      method: routes[i].method,
      withCredentials: true,
    }, data));
  };
}

export default calls;
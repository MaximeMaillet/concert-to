import api from '../../lib/api.js';

export default (values) => {
  api.authenticate(values)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
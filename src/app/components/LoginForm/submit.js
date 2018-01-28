import { SubmissionError } from 'redux-form';
import api from '../../lib/api.js';

export default (values) => {
  return api.authenticate(values)
    .catch((err) => {
      throw new SubmissionError(err.response.data);
    });
};
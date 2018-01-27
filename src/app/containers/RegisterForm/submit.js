import { SubmissionError } from 'redux-form';
import api from '../../lib/api.js';

export default function(values) {
  return api.registration(values)
    .catch((err) => {
      throw new SubmissionError(err.response.data);
    });
};
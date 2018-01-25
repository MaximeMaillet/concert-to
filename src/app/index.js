import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap';
import './assets/styles/layout.scss';
import './assets/styles/forms.scss';

import Homepage from './containers/Homepage.jsx';

ReactDOM.render(
  <Homepage/>,
  document.getElementById('root')
);
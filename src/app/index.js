import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import 'bootstrap';
import './assets/styles/layout.scss';

import Homepage from './containers/Homepage.jsx';

const store = createStore(
  combineReducers({
    form: formReducer,
  })
);

ReactDOM.render(
  <Provider store={store}>
    <Homepage/>
  </Provider>,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { CookiesProvider } from 'react-cookie';
import thunk from 'redux-thunk';
import {reducer as toastrReducer} from 'react-redux-toastr';
import App from './containers/App.jsx';
import userReducers from './containers/User/reducer.js';

const store = createStore(
  combineReducers({
    form: formReducer,
    toastr: toastrReducer,
    authUser: userReducers,
  }),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
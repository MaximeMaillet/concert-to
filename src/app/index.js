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

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    form: formReducer,
    toastr: toastrReducer,
    authUser: userReducers,
    router: routerReducer,
  }),
  applyMiddleware(thunk, middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
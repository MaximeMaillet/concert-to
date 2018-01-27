import React, {Component} from 'react';
import ReduxToastr from 'react-redux-toastr';

import 'bootstrap';
import '../assets/styles/layout.scss';

import Homepage from './Homepage/Homepage.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <Homepage />
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </div>
    );
  }
}
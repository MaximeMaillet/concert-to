import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxToastr from 'react-redux-toastr';
import { withCookies } from 'react-cookie';
import { Route, withRouter } from 'react-router';

import api from '../lib/api.js';
import actions from './User/actions.js';

import 'bootstrap';
import '../assets/styles/layout.scss';

import User from './User/User.jsx';
import Homepage from './Homepage/Homepage.jsx';
import About from './About/About.jsx';
import Search from './Search/Search.jsx';
import Navbar from './Navbar/Navbar.jsx';
import Footer from './Footer/Footer.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    const { cookies } = props;

    if(cookies.get('connect.sid') && !props.user) {
      this.props.startLoading();
      api.user()
        .then((response) => {
          this.props.stopLoading();
          this.props.connect(response.data);
        })
        .catch((err) => {
          this.props.stopLoading();
          this.props.disconnect();
        });
    }
  }

  render() {
    return (
      <div>
        <Navbar />
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/about" component={About}/>
        <Footer />
        <User />
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

export default withCookies(
  withRouter(
    connect(
      (state) => ({
        user: state.authUser.user,
      }),
      (dispatch) => bindActionCreators(actions, dispatch)
    )(App)
  )
);
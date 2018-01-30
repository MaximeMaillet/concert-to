import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toastr} from 'react-redux-toastr';

import actions from '../User/actions.js';
import Description from './components/Description/Description.jsx';

class Homepage extends Component {
  render() {
    return(
      <div>
        <Description
          {...this.props}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.authUser.user,
  }),
  (dispatch) => bindActionCreators(actions, dispatch)
)(Homepage);
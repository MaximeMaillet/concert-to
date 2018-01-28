import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loading from './components/Loading.jsx';

class User extends Component {
  render() {
    return(
      <Loading loading={this.props.loading} />
    );
  }
}

export default connect(
  (state) => ({
    loading: state.authUser.loading
  })
)(User);
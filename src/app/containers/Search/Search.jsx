import React, {Component} from 'react';
import {toastr} from 'react-redux-toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../User/actions.js';
import api from '../../lib/api.js';

import SearchBar from './components/SearchBar/SearchBar.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx';
import Errors from '../Errors/Errors.jsx';

import submit from './components/SearchBar/submit.js';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      size: 10,
      artists: [],
      page: 0,
    };
  }

  searchSuccess = (values) => {
    this.setState({artists: values.data});
  };

  searchFail = (err) => {
    toastr.info('', err.message);
    this.setState({artists: []});
  };

  handleLike = (artist) => {

    api.like({id: artist.id})
      .then(() => {
        toastr.success('Love Like 4ever', `Great love to ${artist.name}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  submit = (values) => {
    values.from = 0;
    values.size = 1;
    return submit(values);
  };

  load = (val) => {
    submit({
      search: this.state.search,
      from: this.state.page+1,
      size: this.state.size,
    })
      .then((values) => {
        this.setState({artists: values.data});
      });
    this.setState({page: this.state.page+1});
  };

  componentDidMount() {
    submit({})
      .then((values) => {
        this.setState({artists: values.data});
      });
  }

  render() {
    if(!this.props.user) {
      return (<Errors title="You are not authorized" />);
    }

    return(
      <div>
        <div className="container">
          <SearchBar
            onSubmit={this.submit}
            className="home-search"
            onSubmitSuccess={this.searchSuccess}
            onSubmitFail={this.searchFail}
          />
          <SearchResults
            artists={this.state.artists}
            handleLike={this.handleLike}
            onLoad={this.load}
            page={this.state.page}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.authUser.user,
  }),
  (dispatch) => bindActionCreators(actions, dispatch)
)(Search);
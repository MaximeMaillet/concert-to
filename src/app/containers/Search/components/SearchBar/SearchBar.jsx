import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

import submit from './submit.js';
import './SearchBar.scss';
import { Search as SearchIcon } from 'react-feather';

class SearchBar extends Component {

  render() {
    return(
      <form
        id="search-form"
        onSubmit={this.props.handleSubmit}
        className={this.props.className}
      >
        <div className="input-group">
          <Field
            id="search-input"
            name="search"
            component="input"
            type="text"
            className="form-control"
            placeholder="Tap artist name ..."
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              <SearchIcon />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'search-form',
  onSubmit: submit,
})(SearchBar);
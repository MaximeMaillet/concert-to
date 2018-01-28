import React, {Component} from 'react';

import './Loading.scss';
import logoLoading from '../images/loading.svg';

class Loading extends Component {

  render() {
    return(
      <div className={`loading ${this.props.loading ? 'active' : ''}`}>
        <img src={logoLoading} alt="loading" />
        <h6>Loading</h6>
      </div>
    );
  }
}

export default Loading;
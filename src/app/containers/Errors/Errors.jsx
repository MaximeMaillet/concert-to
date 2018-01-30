import React, {Component} from 'react';

class Errors extends Component {

  constructor(props) {
    super(props);

    if(!props.title) {
      props.title = 'Unknown error';
    }
  }

  render() {
    return(
      <div style={{minHeight: '300px'}}>
        <div className="container-fluid d-flex align-items-center h-100 flex-column">
          <h1 className="m-auto">{this.props.title}</h1>
          <a href="/">Homepage</a>
        </div>
      </div>
    );
  }
}

export default Errors;
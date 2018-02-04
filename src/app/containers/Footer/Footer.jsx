import React, {Component} from 'react';

import './Footer.scss';

class Footer extends Component {

  render() {
    return (
      <footer>
        <div className="signature">
          <div>Made with</div>
          <a href="https://github.com/MaximeMaillet" target="_blank" rel="noopener" className="test" />
        </div>
      </footer>
    );
  }
}

export default Footer;
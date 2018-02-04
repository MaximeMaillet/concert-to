import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './FlipCard.scss';

export class ReactFlipCard extends Component {
  static propTypes = {
    isFlipped: PropTypes.bool,
    children: (props, propName, componentName) => {
      const prop = props[propName];

      let error = null;
      React.Children.forEach(prop, (child) => {
        if (child.type !== Back && child.type !== Front) {
          error = new Error(`\`${  componentName  }\` children should be of type \`Front\` or \`Back\`.`);
        }
      });
      return error;
    }
  };

  static defaultValues = {
    isFlipped: false
  };

  render() {
    return (
      <div className="flip-container">
        <div className={`flipper ${this.props.isFlipped ? 'flipped':''}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class Front extends Component {
  render() {
    return (
      <div className="front">
        {this.props.children}
      </div>
    );
  }
}

export class Back extends Component {
  render() {
    return (
      <div className="back">
        {this.props.children}
      </div>
    );
  }
}

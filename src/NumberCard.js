import React, { Component } from 'react';

import './number.css';

export default class NumberCard extends Component {
  render() {
    let {title, children, bold} = this.props;

    return (
      <div className="Number">
        <div className="Number--title">
        {title}
        </div>
        <div className={`Number--amount ${bold ? 'bold' : ''}`}>
          {children}
        </div>
      </div>
    );
  }
}

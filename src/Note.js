import React, { Component } from 'react';
import './note.css';

export default class Note extends Component {
  render() {
    let {text} = this.props;

    const blank = text === undefined || (text && text.length === 0);

    if (blank) {
      text = "No note";
    }

    return (
      <div className={`Note ${blank ? 'blank' : ''}`}>
        {text}
      </div>
    );
  }
}

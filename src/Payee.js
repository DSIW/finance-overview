import React, { Component } from 'react';
import { Chip, Avatar } from 'react-md';

const COLORS = Avatar.defaultProps.suffixes;
  // 'red', 'pink', 'purple', 'deep-purple', 'indigo',
  // 'blue', 'light-blue', 'cyan', 'teal', 'green',
  // 'light-green', 'lime', 'yellow', 'amber', 'orange',
  // 'deep-orange', 'brown', 'grey', 'blue-grey'

export default class Payee extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  colorForString(string) {
    let charCodeSum = 0;
    for (let i = 0, len = string.length; i < len; i++) {
      charCodeSum += 1000 * string.charCodeAt(i);
    }
    return COLORS[charCodeSum % COLORS.length];
  }

  onClick(e) {
    this.props.onClick(this.props.name);
  }

  render() {
    const {name} = this.props;

    const initials = name[0];
    const color = this.colorForString(name);

    return (
      <Chip 
        label={name} 
        avatar={<Avatar suffix={color}>{initials}</Avatar>}
        onClick={this.onClick}
      />
    );
  }
}

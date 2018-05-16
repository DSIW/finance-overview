import React, { Component } from 'react';
import { Card, CardText } from 'react-md';

export default class OauthCallback extends Component {
  render() {
    return (
      <Card>
        <CardText>
          <h2 class="md-display-1 md-text-center">Successfully authorized!</h2>
        </CardText>
      </Card>
    );
  }
}

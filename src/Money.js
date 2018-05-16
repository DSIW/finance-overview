import React, { Component } from 'react';
import './money.css';

export default class TransactionsTable extends Component {
  formatAmount(amount, currency) {
    return amount.toLocaleString('de-DE', {
      style: 'currency',
      currency: this.props.currency,
    });
  }

  render() {
    const {amount, currency} = this.props;
    const positive = amount > 0 ? 'positive' : '';
    const negative = amount < 0 ? 'negative' : '';
    const formatted_amount = this.formatAmount(amount, currency);

    return (
      <div className={`Money ${positive} ${negative}`}>{formatted_amount}</div>
    );
  }
}

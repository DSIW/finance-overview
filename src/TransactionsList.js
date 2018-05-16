import React, { Component } from 'react';
import { Grid } from 'react-md';

import Transaction from './Transaction';
import transactionsJson from './data/transactions.json';
import TransactionsTable from './TransactionsTable';

export default class TransactionsList extends Component {
  render() {
    const transactions = transactionsJson.map(transaction => {
      return new Transaction(transaction);
    });

    return (
      <Grid className="transactions">
        <TransactionsTable transactions={transactions} />
      </Grid>
    );
  }
}

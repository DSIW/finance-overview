import React, { Component } from 'react';
import { Grid, Cell } from 'react-md';

import Money from './Money';
import NumberCard from './NumberCard';

export default class TransactionsTable extends Component {
  sum(transactions) {
    return transactions.reduce((sum, {value}) => sum += value, 0);
  }

  income(transactions) {
    return transactions.reduce((sum, {income}) => sum += income, 0);
  }

  expense(transactions) {
    return transactions.reduce((sum, {expense}) => sum -= expense, 0);
  }

  render() {
    let {transactions} = this.props;

    const sum = this.sum(transactions);
    const income = this.income(transactions);
    const expense = this.expense(transactions);

    return (
      <Grid noSpacing={true}>
        <Cell size={3} position="right">
          <NumberCard title="#">
            {transactions.length}
          </NumberCard>
        </Cell>
        <Cell size={3} position="right">
          <NumberCard title="Income">
            <Money amount={income} currency='EUR' />
          </NumberCard>
        </Cell>
        <Cell size={3} position="right">
          <NumberCard title="Expense">
            <Money amount={expense} currency='EUR' />
          </NumberCard>
        </Cell>
        <Cell size={3} position="right">
          <NumberCard title="Sum">
            <Money amount={sum} currency='EUR' />
          </NumberCard>
        </Cell>
      </Grid>
    );
  }
}

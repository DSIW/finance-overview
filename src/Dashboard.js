import React, { Component } from 'react';
import './home.css';

import Transaction from './Transaction';
import transactionsJson from './data/transactions.json';
import CashflowChart from './CashflowChart';
import MonthlyExpensesByCategoryChart from './MonthlyExpensesByCategoryChart';

export default class Dashboard extends Component {
  render() {
    // const transactions = JSON.parse(fs.readFileSync('./data/Ausgaben-20180510-145229.json'));
    // const transactions = JSON.parse(transactionsJson);
    const transactions = transactionsJson.map(transaction => {
      return new Transaction(transaction);
    });

    return (
      <div className="Dashboard">
        <CashflowChart legend={true} height={300} transactions={transactions} />
        <MonthlyExpensesByCategoryChart transactions={transactions} category="category" />
        <MonthlyExpensesByCategoryChart transactions={transactions} category="subcategory" />
      </div>
    );
  }
}

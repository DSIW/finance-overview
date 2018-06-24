import React, { Component } from 'react';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class MonthlyExpensesByCategoryChart extends Component {
  justifyNumber(number) {
      return (number < 10) ? `0${number}` : `${number}`;
  }

  toMonths(milliseconds) {
      return Math.floor(milliseconds / 1000 / 60 / 60 / 24 / 30);
  }

  sum(values) {
    return values.reduce((sum, value) => sum += value, 0);
  }

  avg(array) {
    if (array.length <= 0) return 0;
    return this.sum(array) / array.length;
  }

  prepareChartData(transactions) {
    const categoryProp = this.props.category;

    const numMonths = Math.max(1, this.toMonths(new Date() - transactions[0].date));

    let transactionsByCatAndMonth = {};
    transactions.forEach(({date, category, subcategory, income, expense, value}) => {

      let combcategory;
      if (categoryProp === "subcategory") {
        combcategory = `${category.slice(0, 5)}:${subcategory.slice(0,5)}`;
      } else {
        combcategory = `${category.slice(0, 5)}`;
      }

      let month = this.justifyNumber(date.getMonth()+1)
      const yearMonth = `${date.getFullYear()}-${month}`;

      if (transactionsByCatAndMonth[combcategory] === undefined) {
        transactionsByCatAndMonth[combcategory] = {};
      }
      if (transactionsByCatAndMonth[combcategory][yearMonth] === undefined) {
        transactionsByCatAndMonth[combcategory][yearMonth] = {income: 0, expense: 0};
      }
      transactionsByCatAndMonth[combcategory][yearMonth]['income'] += income;
      transactionsByCatAndMonth[combcategory][yearMonth]['expense'] -= expense;
    });

    const roundPrice = (amount) => Math.round(amount * 100) / 100;

    const data = [];
    Object.entries(transactionsByCatAndMonth).forEach(([cat, transactionsByMonth]) => {
      const incomes = Object.entries(transactionsByMonth).map(([month, {income}]) => income);
      const income = roundPrice(this.sum(incomes) / numMonths);

      const expenses = Object.entries(transactionsByMonth).map(([month, {expense}]) => expense);
      const expense = roundPrice(this.sum(expenses) / numMonths);

      data.push({category: cat, income, expense});
    })

    return data;
  }

  render() {
    const { transactions } = this.props;

    const data = this.prepareChartData(transactions);

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="horizontal" stackOffset="sign"
        margin={{top: 20, right: 30, left: 20, bottom: 15}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="category" />
          <YAxis/>
          <Tooltip/>
          <Legend />
          <Bar unit=' €' dataKey="expense" fill="red" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

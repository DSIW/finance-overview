import React, { Component } from 'react';

import { PieChart, Pie, ResponsiveContainer } from 'recharts';

export default class TransactionsByCategoryChart extends Component {
  sum(values) {
    return values.reduce((sum, value) => sum += value, 0);
  }

  avg(array) {
    if (array.length <= 0) return 0;
    return this.sum(array) / array.length;
  }

  group(transactions, categoryProp) {
    let groupedStats = {};
    transactions.forEach(({date, category, subcategory, income, expense, value}) => {

      let combcategory;
      if (categoryProp == "subcategory") {
        combcategory = `${category.slice(0, 5)}:${subcategory.slice(0,5)}`;
      } else {
        combcategory = `${category.slice(0, 5)}`;
      }

      if (groupedStats[combcategory] === undefined) {
        groupedStats[combcategory] = {income: 0, expense: 0};
      }
      groupedStats[combcategory]['income'] += income;
      groupedStats[combcategory]['expense'] -= expense;
    });

    return groupedStats;
  }

  prepareChartData(transactions) {
    const roundPrice = (amount) => Math.round(amount * 100) / 100;

    const categories = [];
    const groupedByCat = this.group(transactions, 'category');
    Object.entries(groupedByCat).forEach(([cat, stats]) => {
      // const income = roundPrice(stats.income);
      const expense = roundPrice(stats.expense);
      categories.push({name: cat, value: expense});
    })

    const subcategories = [];
    const groupedBySubcat = this.group(transactions, 'subcategory');
    Object.entries(groupedBySubcat).forEach(([subcat, stats]) => {
      // const income = roundPrice(stats.income);
      const expense = roundPrice(stats.expense);
      subcategories.push({name: subcat, value: expense});
    })

    console.log(categories);
    console.log(subcategories);

    return {categories, subcategories};
  }

  render() {
    const {transactions, height} = this.props;

    const {categories, subcategories} = this.prepareChartData(transactions);

    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={categories} cx={100} cy={100} outerRadius={60} fill="#8884d8" />
          <Pie data={subcategories} cx={100} cy={100} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

import React, { Component } from 'react';
import dayjs from 'dayjs';

import { ComposedChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Line, ResponsiveContainer } from 'recharts';

class PosNegDot extends Component {
  render() {
    const {cx, cy, radius, _stroke, value} = this.props;

    const fill = value < 0 ? "red" : "green";

    return (
      <circle r={radius} fill={fill} strokeWidth="2" stroke="white" cx={cx} cy={cy}></circle>
    );
  }
}

export default class CashflowChart extends Component {
  justifyNumber(number) {
      return (number < 10) ? `0${number}` : `${number}`;
  }

  prepareChartData(groupFormatString, transactions) {
    let groupedTransactions = [];
    transactions.forEach(({date, income, expense, value}) => {

      const group = dayjs(date).format(groupFormatString);

      if (groupedTransactions[group] === undefined) {
        groupedTransactions[group] = {income: 0, expense: 0, value: 0};
      }
      groupedTransactions[group]['income'] += income;
      groupedTransactions[group]['expense'] -= expense;
      groupedTransactions[group]['value'] += value;
    });

    const roundPrice = (amount) => Math.round(amount * 100) / 100;

    const data = [];
    Object.entries(groupedTransactions).forEach(([key, values], i) => {
      const { income, expense, value } = values;
      const previousValue = data.length >= 1 ? data[i-1].balance : 0;
      data.push({
        month: key,
        income: roundPrice(income),
        expense: roundPrice(expense),
        balance: roundPrice(previousValue + value)
      });
    })

    return data;
  }

  render() {
    const { transactions, legend, height, groupBy } = this.props;

    const data = this.prepareChartData(groupBy, transactions);

    return (
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} stackOffset="sign"
        margin={{top: 20, right: 30, left: 20, bottom: 15}}>
          <CartesianGrid strokeDasharray="3 3"  stroke="#ccc" vertical={false} />
          <XAxis stroke="#555" fontSize="12px" dataKey="month" />
          <YAxis stroke="#555" fontSize="12px" />
          <Tooltip/>
          {!!legend && <Legend />}
          <ReferenceLine y={0} stroke="#0000008a" />
          <Bar unit=' €' dataKey="income" fill="#00695caa" stackId="stack" />
          <Bar unit=' €' dataKey="expense" fill="#d50000aa" stackId="stack" />
          <Line unit=' €' type='monotone' dataKey='balance' stroke="#0277BDFF" dot={false} activeDot={<PosNegDot radius={4} />} />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

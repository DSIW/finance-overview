import React, { Component } from 'react';
import { Card, CardText, Grid, Cell, TextField, FontIcon, DataTable, TableHeader, TableRow, TableColumn, TableBody } from 'react-md';
import dayjs from 'dayjs';

import Money from './Money';
import Payee from './Payee';
import Note from './Note';
import Category from './Category';
import TransactionsTableHeader from './TransactionsTableHeader';
import CashflowChart from './CashflowChart';

export default class TransactionsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {filter: null};

    this.onSearch = this.onSearch.bind(this);
    this.onFilterPayee = this.onFilterPayee.bind(this);
    this.onFilterCategory = this.onFilterCategory.bind(this);
  }

  onSearch(e) {
    if (e.key === 'Enter') {
      if (e.target.value.length > 0) {
        this.setState({filter: e.target.value});
      } else {
        this.setState({filter: null});
      }
    }
  }

  onFilterPayee(payee) {
    this.setState({filter: `payee:${payee}`});
  }

  onFilterCategory(category) {
    if (category.indexOf(':') !== -1) {
      this.setState({filter: `subcategory:${category}`});
    } else {
      this.setState({filter: `category:${category}`});
    }
  }

  filter(transactions) {
    const {filter} = this.state;
    const filtered = [];

    transactions.forEach(transaction => {
      let found = false;

      if (filter === null || filter === undefined) {
        found = true;
      } else {
        let [filterKey, ...filterValue] = filter.split(':');
        filterValue = filterValue.join(':');
        if (filterValue) {
          found = transaction.search(filterValue, filterKey);
        } else { // no filter key specified
          found = transaction.search(filterKey);
        }
      }

      if (found) {
        filtered.push(transaction);
      }
    });

    return filtered;
  }

  render() {
    let {transactions} = this.props;

    transactions = this.filter(transactions);

    return (
      <div className="transactions-table-container">
        <Grid>
          <Card style={{width: '100%'}}>
            <CardText>
              <Grid>
                <Cell size={3}>
                  <TextField
                    id="transactions-table-search-field"
                    label="Search"
                    type="text"
                    rightIcon={<FontIcon>search</FontIcon>}
                    fullWidth={true}
                    //value={this.state.filter}
                    onKeyPress={this.onSearch}
                  />
                </Cell>
                <Cell size={9} align="bottom">
                <TransactionsTableHeader transactions={transactions} />
                </Cell>
              </Grid>
            </CardText>
          </Card>
        </Grid>
        <Grid>
          <Card style={{width: '1057px'}}>
            <CardText>
              <CashflowChart groupBy='YYYY-MM-DD' legend={false} height={200} transactions={transactions} />
            </CardText>
          </Card>
        </Grid>
        <Grid className="transactions-table-container">
          <Card tableCard={true}>
            <CardText>
              <DataTable baseId="transactions-table">
                <TableHeader>
                  <TableRow>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Payee</TableColumn>
                    <TableColumn>Category</TableColumn>
                    <TableColumn grow>Note</TableColumn>
                    <TableColumn numeric>Value</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map(({ date, payee, category, subcategory, note, value }, i) => (
                    <TableRow key={i}>
                      <TableColumn>{dayjs(date).format('DD.MM.YYYY')}</TableColumn>
                      <TableColumn><Payee name={payee} onClick={this.onFilterPayee} /></TableColumn>
                      <TableColumn>
                        <Category onClick={this.onFilterCategory}
                        category={category}
                        subcategory={subcategory} />
                      </TableColumn>
                      <TableColumn><Note text={note} /></TableColumn>
                      <TableColumn numeric><Money amount={value} currency={'EUR'} /></TableColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </DataTable>
            </CardText>
          </Card>
        </Grid>
      </div>
    );
  }
}

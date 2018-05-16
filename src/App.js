import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from './NavLink';

import Dashboard from './Dashboard';
import TransactionsList from './TransactionsList';
import OauthCallback from './OauthCallback';

const navItems = [{
  exact: true,
  label: 'Dashboard',
  to: '/',
  icon: 'donut_large',
}, {
  label: 'Transactions',
  to: '/transactions',
  icon: 'list',
}];

class App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="Transactions"
            toolbarTitle="Finance Overview"
            navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
          >
            <Switch key={location.key}>
              <Route exact path="/" location={location} component={Dashboard} />
              <Route path="/transactions" location={location} component={TransactionsList} />
              <Route path="/oauth/callback" location={location} component={OauthCallback} />
            </Switch>
          </NavigationDrawer>
        )}
      />
    );
  }
}

export default App;

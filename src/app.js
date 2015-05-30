import React from 'react';
import Router from 'react-router';
const { Route, RouteHandler, DefaultRoute, Link } = Router;
import authUtils from './utils/authUtils';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Org from './components/Org';

const App = React.createClass({
  getInitialState () {
    return {
      isLoggedIn: authUtils.getUser() ? true : false
    };
  },

  componentWillMount () {
    authUtils.onChange = this.handleAuthChange;
  },

  handleAuthChange (isLoggedIn) {
    this.setState({
      isLoggedIn
    });
  },

  render () {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <Link to="logout">Log Out</Link>
         ) : (
           <Link to="login">Log In</Link>
         )}
           <RouteHandler />
      </div>
    );
  }
});

const routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home} />
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
    <Route name="dashboard" handler={Dashboard} path="orgs">
      <Route name="org" handler={Org} path=":name" />
    </Route>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.body);
});

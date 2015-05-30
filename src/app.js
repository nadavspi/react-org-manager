import React from 'react';
import Router from 'react-router';
const { Route, RouteHandler, DefaultRoute, Link } = Router;
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import Dashboard from './Dashboard';
import authUtils from './utils/authUtils';
import OrgTeams from './OrgTeams';

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
    <Route name="dashboard" handler={Dashboard}>
      <Route name="org" handler={OrgTeams} path=":name" />
    </Route>
  </Route>
);

Router.run(routes, (Root) => {
  React.render(<Root/>, document.body);
});

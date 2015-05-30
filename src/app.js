import React from 'react';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';

const App = React.createClass({
  getInitialState () {
    return {
      user: null
    };
  },

  handleAuth (user) {
    this.setState({
      user
    });
  },

  render () {
    const { user } = this.state;

    return (
      <div>
        {user === null ? (
          <LoginPage onAuth={this.handleAuth} />
         ) : (
           <Dashboard user={user} />
         )}
      </div>
    );
  }
});


React.render(<App/>, document.body);

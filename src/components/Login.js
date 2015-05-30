import React from 'react';
import Router from 'react-router';
import authUtils from '../utils/authUtils';

export default React.createClass({
  mixins: [ Router.Navigation ],

  statics: {
    attemptedTransition: null
  },

  getInitialState () {
    return {
      error: false
    };
  },

  handleLogin () {
    authUtils.login(() => {
      if (this.attemptedTransition) {
	const transition = this.attemptedTransition;
	this.attemptedTransition = null;
	transition.retry();
      } else {
	this.replaceWith('dashboard');
      }
    });
  },

  render () {
    return (
      <div>
        <h2>Login</h2>
        <button
          type="button"
          onClick={this.handleLogin}
	>
          Login with GitHub
        </button>
      </div>
    );
  }
});

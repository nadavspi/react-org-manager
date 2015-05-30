import React from 'react';
import authUtils from '../utils/authUtils';
import { Link } from 'react-router';

export default React.createClass({
  statics: {
    willTransitionTo (transition) {
      if (authUtils.getUser()) {
	transition.redirect('dashboard');
      }
    }
  },

  render () {
    return (
      <div>
	<h1>Org Manager</h1>
	<p>For managing your GitHub orgs, y'know.</p>
      </div>
    );
  }
});

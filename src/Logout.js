import React from 'react';
import authUtils from './utils/authUtils';
import Auth from './utils/AuthMixin';

export default React.createClass({
  mixins: [ Auth ],

  componentWillMount () {
    authUtils.logout();
  },

  render () {
    return (
      <p>You've been logged out.</p>
    );
  }
});

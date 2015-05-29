import React from 'react';
import Firebase from 'firebase';

const HOST = 'https://react-org-manager.firebaseio.com';
const ref = new Firebase(HOST);


export default React.createClass({
  propTypes: {
    onAuth: React.PropTypes.func.isRequired
  },

  login () {
    ref.authWithOAuthPopup('github', (err, authData) => {
      if (err) {
        console.log(err);
      } else {
        this.props.onAuth({
          uid: authData.uid,
          accessToken: authData.github.accessToken,
          displayName: authData.github.displayName
        });
      }
    }, {
      scope: 'admin:org'
    });
  },

  render () {
    return (
      <div>
        <h2>Login</h2>
        <button type="button" onClick={this.login}>Login with GitHub</button>
      </div>
    );
  }
});

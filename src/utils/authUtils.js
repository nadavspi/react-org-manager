import Firebase from 'firebase';

const HOST = 'https://react-org-manager.firebaseio.com';
const ref = new Firebase(HOST);

let cachedUser = null;

export default {
  login (cb) {
    ref.authWithOAuthPopup('github', (err, authData) => {
      if (err) {
        console.log(err);
      } else {
	cachedUser = authData;
	cb(authData);
	this.onChange(true);
      }
    }, {
      scope: 'admin:org'
    });
  },

  getUser () {
    return cachedUser || ref.getAuth() || null;
  },

  logout () {
    ref.unauth();
    cachedUser = null;
    this.onChange(false);
  }
};

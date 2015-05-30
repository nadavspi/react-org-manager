import Login from '../Login';
import authUtils from './authUtils';

export default {
  statics: {
    willTransitionTo: function (transition) {
      if (!authUtils.getUser()) {
	Login.attemptedTransition = transition;
        transition.redirect('login');
      }
    }
  }
};

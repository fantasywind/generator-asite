import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AuthConstants from '../constants/AuthConstants.js';
import AuthStore from '../stores/AuthStore.js';

export default {
  login(email, password) {
    // Do Server Action

    AppDispatcher.dispatch({
      action: AuthConstants.AUTH_LOGIN_SUCCESSFUL,
      token: 'ACCESS_TOKEN',
      name: 'admin'
    });
  },

  logout() {
    AppDispatcher.dispatch({
      action: AuthConstants.AUTH_LOGOUT
    });
  }
}

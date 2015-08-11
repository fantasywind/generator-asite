import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {EventEmitter} from 'events';
import AuthConstants from '../constants/AuthConstants.js';
import assign from 'object-assign';

// Server Side Hotfix
const localStorage = localStorage || {};

const CHANGE_EVENT = 'change';

let _token = localStorage.accessToken;
let _name = '';

const AuthStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(listener) {
    return this.removeListener(CHANGE_EVENT, listener);
  },

  getStatus() {
    return _token ? AuthConstants.AUTH_STATE_LOGINED : AuthConstants.AUTH_STATE_GUEST;
  },

  getToken() {
    return _token;
  },

  getName() {
    return _name;
  }
});

AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action) {
    case AuthConstants.AUTH_LOGIN_SUCCESSFUL:
      _token = payload.token;
      _name = payload.name;
      AuthStore.emitChange();
      break;

    case AuthConstants.AUTH_LOGOUT:
      _token = null;
      _name = '';
      AuthStore.emitChange();
      break;
  }

  return true;
});

export default AuthStore;

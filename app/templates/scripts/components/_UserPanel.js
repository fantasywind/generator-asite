import React from 'react';
import Radium from 'radium';

// Flux
import AuthStore from '../stores/AuthStore.js';
import AuthConstants from '../constants/AuthConstants.js';
import AuthActions from '../actions/AuthActions.js';

// Components
import LoginPopup from '../components/LoginPopup.js';

const styles = {
  wrap: {
    width: '80px',
    textAlign: 'right',
    position: 'relative'
  },
  wrapLogined: {
    width: '180px'
  },
  button: {
    border: '1px solid #DDD',
    backgroundColor: '#FFF',
    outline: 'none',
    boxSizing: 'border-box',
    padding: '0.2em 1.2em',
    fontSize: '1em',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#FBFCFC'
    }
  },
  name: {
    color: '#515151',
    margin: '0 10px 0 0'
  }
};

const UserPanel = React.createClass({
  getInitialState() {
    return {
      loginStatus: AuthStore.getStatus(),
      showLoginPopup: false,
      name: AuthStore.getName()
    };
  },

  componentDidMount() {
    AuthStore.addChangeListener(this.authChange);
  },

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.authChange);
  },

  authChange() {
    this.setState({
      loginStatus: AuthStore.getStatus(),
      name: AuthStore.getName()
    });
  },

  togglePopup() {
    this.setState({
      showLoginPopup: !this.state.showLoginPopup
    });
  },

  logout() {
    AuthActions.logout();
  },

  render() {
    if (this.state.loginStatus === AuthConstants.AUTH_STATE_LOGINED) {
      return (
        <div style={[styles.wrap, styles.wrapLogined]}>
          <span style={styles.name}>Hi, {this.state.name}</span>
          <button onClick={this.logout} style={styles.button} type='button'>Log Out</button>
        </div>
      );
    } else {
      return (
        <div style={styles.wrap}>
          <button onClick={this.togglePopup} style={styles.button} type='button'>{(this.state.showLoginPopup ? 'Close' : 'Login')}</button>
          <LoginPopup show={this.state.showLoginPopup} />
        </div>
      );
    }
  }
});

module.exports = Radium(UserPanel);

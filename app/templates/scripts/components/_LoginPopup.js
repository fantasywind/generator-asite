import React from 'react';
import Radium from 'radium';

// Flux
import AuthStore from '../stores/AuthStore.js';
import AuthConstants from '../constants/AuthConstants.js';
import AuthActions from '../actions/AuthActions.js';

const styles = {
    wrap: {
    position: 'absolute',
    width: '260px',
    boxShadow: '1px 1px 12px #919292',
    border: '1px solid #CCC',
    padding: '12px 18px',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    top: '36px',
    right: '-12px',
    display: 'none',
    zIndex: 50,
    borderRadius: '4px'
  },
  wrapShow: {
    display: 'block'
  },
  submitButton: {
    margin: '8px 0 0 0',
    border: '1px solid #7dd',
    backgroundColor: '#5cd',
    outline: 'none',
    boxSizing: 'border-box',
    padding: '0.2em 1.2em',
    fontSize: '0.8=76em',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#5ce'
    }
  },
  inputGroup: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    alignItems: 'center',
    margin: '10px 0'
  },
  inputHelper: {
    width: '80px'
  },
  input: {
    flex: 1,
    boxSizing: 'border-box',
    margin: '0 16px'
  }
};

const LoginPopup = React.createClass({
  propTypes: {
    show: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      show: false
    }
  },

  getInitialState() {
    return {
      email: '',
      password: ''
    };
  },

  handleEmail(e) {
    this.setState({
      email: e.target.value
    });
  },

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  },

  submit() {
    AuthActions.login(this.state.email, this.state.password);
  },

  render() {
    return (
      <div style={[styles.wrap, (this.props.show ? styles.wrapShow : null)]}>
        <div styles={styles.inputGroup}>
          <label htmlFor='loginEmail' style={styles.inputHelper}>Email</label>
          <input id='loginEmail' style={styles.input} type='text' placeholder='admin@yoursite.com' value={this.state.email} onChange={this.handleEmail} />
        </div>
        <div styles={styles.inputGroup}>
          <label htmlFor='loginPassword' style={styles.inputHelper}>Password</label>
          <input id='loginPassword' style={styles.input} type='password' placeholder='12345678' value={this.state.password} onChange={this.handlePassword} />
        </div>
        <button style={styles.submitButton} onClick={this.submit} type='button'>Login</button>
      </div>
    );
  }
});

module.exports = Radium(LoginPopup);

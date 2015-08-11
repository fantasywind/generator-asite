import React from 'react';
import {NavigatableMixin} from 'react-router-component';

// Components
import UserPanel from './UserPanel.js';

const styles = {
  header: {
    backgroundColor: '#F7F7F7',
    borderBottom: '1px solid #DDD',
    padding: '0 2em'
  },
  title: {
    cursor: 'pointer',
    flex: 1
  },
  contentWrap: {
    width: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center'
  }
};

const SiteHeader = React.createClass({
  mixins: [NavigatableMixin],

  toHome() {
    this.navigate('/');
  },

  render() {
    return (
      <header style={styles.header}>
        <div style={styles.contentWrap}>
          <h1 style={styles.title} onClick={this.toHome}>Hello world!</h1>
          <UserPanel />
        </div>
      </header>
    )
  }
});

module.exports = SiteHeader;

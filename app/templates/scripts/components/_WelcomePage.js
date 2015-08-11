import React from 'react';
import {Link} from 'react-router-component';

const styles = {
  wrap: {
    margin: '0 auto',
    width: '1200px'
  }
};

const WelcomePage = React.createClass({
  render() {
    return (
      <div style={styles.wrap}>
        <h1>Yo!</h1>
        <p>Hello, you have an awesome website project generated.</p>
        <p>
          <span>try to login :D, or find </span>
          <Link href='/awesome'>some interests</Link>
        </p>
      </div>
    )
  }
});

module.exports = WelcomePage;

import React from 'react';

const styles = {
  wrap: {
    margin: '0 auto',
    width: '1200px'
  }
};

const SomethingAwesome = React.createClass({
  render() {
    return (
      <div style={styles.wrap}>
        <h1>SomethingAwesome happended!</h1>
      </div>
    )
  }
});

module.exports = SomethingAwesome;

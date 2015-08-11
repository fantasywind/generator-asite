var React = require('react');

var App = React.createClass({
  render: function () {
    return (
      <div id='site'>
        <h1><%= appname%></h1>
        <p>Hello, World!</p>
      </div>
    )
  }
});

module.exports = App;

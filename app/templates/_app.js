#!/use/bin/env node

var webpack = require('webpack');
var debug = require('debug')("<%= appname%>:App");
var serverBinder = require('./server.js');
var webpackDevConfig = require('../webpack.dev.config.js');
var webpaclConfig = require('../webpack.config.js');
var server;

var LISTEN_PORT = process.env.PORT || 8080;
var NODE_ENV = process.env.NODE_ENV || 'development';

// Create Server<% if (server === 'Express 4') {%>
server = require('express')();<%}%>

// Webpack Dev Server
if (NODE_ENV === 'development') {
  var compiler = webpack(webpackDevConfig);
  <% if (server === 'Express 4') {%>
  server.use(require("webpack-dev-middleware")(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    stats: {
      colors: true
    }
  }));
  server.use(require("webpack-hot-middleware")(compiler));<%}%>
} else if (NODE_ENV === 'production') {
  var compiler = webpack(webpaclConfig);
  
  debug('[Production] Client files compiling...');
  compiler.run(function (err, stats) {
    if (err) {
      debug(err);
    } else {
      debug('[Production] Client files compiled.');
    }
  });
}

serverBinder(server);

server.listen(LISTEN_PORT, function () {
  debug('Server Listen on %s', LISTEN_PORT);
});

require("babel/register");

var express = require('express');
var babel = require('babel');
var React = require('react');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var debug = require('debug')('mysite123:Server');
var bodyParser = require('body-parser');
var app = express();

// Prepare Server Render
var ClientApp = require('./scripts/components/App.js');
var ClientContainer = fs.readFileSync(path.resolve(__dirname, '_index.html'), {
  encoding: 'utf8'
});

// Routes
var Routes = {
  main: require('./api/routes/main.js')
};

// Binder
module.exports = function (app) {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static(path.join(__dirname, '../build')));

  // Handle Server Render
  app.use(function (req, res, next) {
    if (req.url.match(/\/(index\.html?)?$/)) {
      var html = React.renderToString(React.createElement(ClientApp, {
        path: req.url
      }));
      res.send(ClientContainer.replace(/<!--Render Content-->/, html));
    } else {
      next();
    }
  });

  // API Route
  app.use(function (req, res, next) {
    req.url = req.url.replace(/^\/api/, '');
    next();
  });

  app.use(Routes.main);

  return app;
};

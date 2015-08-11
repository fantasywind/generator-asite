var generators = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');

var TEMPLATE_PATH = path.resolve(__dirname, 'templates');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('appname', {
      type: String,
      required: false
    });
  },

  greeting: function () {
    this.log(yosay('Hello, I\'ll generate asite for you.'));
  },

  askServer: function () {
    var done = this.async();
    this.prompt([{
      type: 'input',
      name: 'appname',
      message: 'What\'s your app name?',
      default: this.appname || 'MyWebsite'
    }, {
      type: 'list',
      name: 'server',
      message: 'Which backend framework do you want?',
      choices: [
        'Express 4',
        // TO-DO
        // 'Koa'
      ],
      store: true,
      default: 'Express 4'
    }], function (answers) {
      this.appname = answers.appname;
      this.options.env.kebabName = _.kebabCase(this.appname);

      _.forEach(answers, function (value, key) {
        this.options.env[key] = value;
      }.bind(this));

      done();
    }.bind(this));
  },

  copyServerFiles: function () {
    switch(this.config.get('server')) {
      case 'Koa':
        this._koaServer();
        break;
      case 'Express 4':
      default:
        this._expressServer();
        break;
    }
  },

  copyCommonFiles: function () {
    var files = {
      '_package.json': 'package.json',
      '_app.js': 'src/app.js',
      '_.gitignore': '.gitignore',
      '_webpack.dev.config.js': 'webpack.dev.config.js',
      '_webpack.config.js': 'webpack.config.js',
      '_index.html': 'src/_index.html',
      'scripts/_main.js': 'src/scripts/main.js',
      'scripts/actions/_AuthActions.js': 'src/scripts/actions/AuthActions.js',
      'scripts/components/_App.js': 'src/scripts/components/App.js',
      'scripts/components/_SiteHeader.js': 'src/scripts/components/SiteHeader.js',
      'scripts/components/_UserPanel.js': 'src/scripts/components/UserPanel.js',
      'scripts/components/_LoginPopup.js': 'src/scripts/components/LoginPopup.js',
      'scripts/components/_WelcomePage.js': 'src/scripts/components/WelcomePage.js',
      'scripts/components/_SomethingAwesome.js': 'src/scripts/components/SomethingAwesome.js',
      'scripts/constants/_AuthConstants.js': 'src/scripts/constants/AuthConstants.js',
      'scripts/dispatcher/_AppDispatcher.js': 'src/scripts/dispatcher/AppDispatcher.js',
      'scripts/stores/_AuthStore.js': 'src/scripts/stores/AuthStore.js',
    };

    _.forEach(files, function (target, origin) {
      this.fs.copyTpl(
        this.templatePath(path.join(TEMPLATE_PATH, origin)),
        this.destinationPath(target),
        this.options.env
      );
    }.bind(this));
  },

  // Private
  _koaServer: function () {

  },

  _expressServer: function () {
    var files = {
      '_expressServer.js': 'src/server.js',
      'api/routes/main.js': 'src/api/routes/main.js'
    };

    _.forEach(files, function (target, origin) {
      this.fs.copyTpl(
        this.templatePath(path.join(TEMPLATE_PATH, origin)),
        this.destinationPath(target),
        this.options.env
      );
    }.bind(this));
  }
});

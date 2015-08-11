var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: true,
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.resolve(__dirname, 'src/scripts/main.js')
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  output: {
    publicPath: '/',
    path: path.join(process.cwd(), '/build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'react-hot!babel',
      exclude: /node_modules/
    }, {
      test: /\.(html)$/,
      loader: "file?name=[path][name].[ext]&context=./src"
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      GOOGLE_CLIENT_ID: "'YOUR_GOOGLE_CLIENT_ID'"
    }),
    new webpack.NoErrorsPlugin(),
  ]
}

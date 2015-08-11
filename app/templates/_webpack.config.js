var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: false,
  entry: {
    app: [
      path.resolve(__dirname, 'src/scripts/main.js')
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  output: {
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
    new webpack.DefinePlugin({
      GOOGLE_CLIENT_ID: "'YOUR_GOOGLE_CLIENT_ID'"
    }),
    new webpack.NoErrorsPlugin(),
  ]
}

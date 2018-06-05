const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: 'source-map',
  entry: {
    bundle: ['whatwg-fetch', './src/index']
  },
  output: {
    path: path.join(__dirname, 'output'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'expose-loader?Pages.Home.Request.Lite',
          'babel-loader',
          'ifdef-loader?FAKE=false&PRODUCTION=true&DEV=false'
        ],
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src',
      'node_modules']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

};

module.exports = config;

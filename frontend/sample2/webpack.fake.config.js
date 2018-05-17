const webpack = require('webpack');
const path = require('path');

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('fake')
    }
  })
];

const config = {
  devtool: 'source-map',
  entry: {
    bundle: ['babel-polyfill', './src/index.fake']
  },
  output: {
    path: path.join(__dirname, 'output'),
    filename: '[name].fake.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
          'ifdef-loader?FAKE=true&PRODUCTION=false&DEV=false'
        ],
        exclude: /node_modules/,
      }
    ]

  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src',
      'node_modules']
  },
  plugins,
  watch: true
};

module.exports = config;

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
  new ExtractTextPlugin('components.css'),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/),
  new webpack.ContextReplacementPlugin(/numeral[\/\\]locale$/, /en|ru/),
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
    filename: '[name].fake.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError: true,
        },
      },

      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
          'ifdef-loader?FAKE=true&PRODUCTION=false&DEV=false'
        ],
        include: [
          path.resolve(__dirname, './src'),
          /node_modules[/\\]vendor-react-ui-toolkit/,
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          {
            use: [{
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }]
          })
      },
      {
        test: /\.pcss$/,
        loader: ExtractTextPlugin.extract(
          {
            use: [{
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            { loader: 'postcss-loader' }]
          })
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.svg$/,
        use: [{ loader: 'svg-react-loader' }],
      },
    ]

  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'src'],
  },
  plugins,
  watch: true,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    classnames: 'classNames'
  }
};

module.exports = config;

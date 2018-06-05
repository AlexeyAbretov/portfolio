const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
          'expose-loader?Pages.Home.Profile',
          'babel-loader',
          'ifdef-loader?FAKE=false&PRODUCTION=true&DEV=false'
        ],
        include: [
          path.resolve(__dirname, './src'),
          /node_modules[/\\]vendor-react-ui-toolkit/,
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          {
            use: [{
              loader: 'css-loader',
              query: {
                modules: true,
                minimize: true,
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
                minimize: true,
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
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src',
      'node_modules']
  },
  plugins: [
    new ExtractTextPlugin('components.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new webpack.ContextReplacementPlugin(/numeral[\/\\]locale$/, /ru/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};

module.exports = config;

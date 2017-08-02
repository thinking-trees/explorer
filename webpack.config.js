'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/main.js'
  ],
  output: {
    path: './dist',
    filename: 'app.[hash:9].min.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|lib)/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|lib)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: require.resolve('./lib/angular/angular'),
        loader: 'exports?angular'
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|lib)/,
        loader: ExtractTextWebpackPlugin.extract('css!postcss!sass')
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)/,
        loader: 'url?limit=8192&name=fonts/[name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('app.[hash:9].min.css'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        angular: true,
        drop_console: true,
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      {from: './src/index.html'}
    ])
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      angular: path.resolve(__dirname, 'lib/angular/angular'),
      'angular-ui-router': path.resolve(__dirname, 'lib/angular-ui-router/release/angular-ui-router'),
      lodash: path.resolve(__dirname, 'lib/lodash/dist/lodash.min')
    }
  },
  devServer: {
    contentBase: './dist',
    port: 7777,
    colors: true,
    historyApiFallback: true,
    inline: true
  },
  devtool: 'source-map',

  /**
   * Config for Webpack Loaders
   */
  eslint: {
    failOnError: false,
    formatter: require('eslint-friendly-formatter'),
    outputReport: {
      filePath: '../reports/code-style/code-style-checking.xml'
    }
  },
  postcss: {
    plugins: [
      require('autoprefixer')
    ]
  }
};

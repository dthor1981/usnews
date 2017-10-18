// Base from :
// https://github.com/AriaFallah/WebpackTutorial/blob/master/part1/example1/webpack.config.js
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/index'
  ], // .js after index is optional
  output: {
    // publicPath: path.join(__dirname, 'public'),
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src' },
      { from: 'img' }
    ])
  ],
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compressor: {
  //       warnings: false,
  //     },
  //   }),
  //   new webpack.optimize.OccurrenceOrderPlugin()
  // ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.njk$/,
        loader: 'nunjucks-loader'
      },
      // TODO: delete
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: 'json',
      },
    ]
  },
  resolve: {
    // Prefer to keep this minimal as possible, as the more
    // paths webpack has to look through will slow down the
    // compile process.
    modulesDirectories: [
      "",
      "src",
      "node_modules"
    ]
  }
}
var webpack = require('webpack');
var base = require('./webpack.base.config.babel');
var _ = require("lodash");

module.exports = _.merge(base, {
  devtool: '#eval-cheap-module-source-map',
  output: {
    path: './public',
    filename: 'bundle.js',
    publicPath: '/public/'
  }
});

var webpack = require('webpack');
var base = require('./webpack.base.config.babel');
var _ = require("lodash");

module.exports = _.merge(base, {
  devtool: '#cheap-eval-source-map',
  output: {
    path: './public',
    filename: 'bundle.js',
    publicPath: '/public/'
  }
});

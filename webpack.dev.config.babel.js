var webpack = require('webpack');
var base = require('./webpack.base.config.babel');
var _ = require("lodash");
var path = require('path')

module.exports = _.merge(base, {
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  }
});

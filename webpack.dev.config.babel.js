var webpack = require('webpack');
var baseConfig = require('./webpack.base.config.babel');
var config = Object.create(baseConfig);

config.devtool = '#eval-cheap-module-source-map';

config.output = {
  path: './public',
  filename: 'bundle.js',
  publicPath: '/public/'
};

module.exports = config;

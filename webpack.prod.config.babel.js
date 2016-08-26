var webpack = require('webpack');
var baseConfig = require('./webpack.base.config.babel');
var config = Object.create(baseConfig);

config.output = {
  path: './build',
  filename: 'bundle.js',
  publicPath: '/public/'
};

config.plugins = [
  ...baseConfig.plugins,
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
];

module.exports = config;

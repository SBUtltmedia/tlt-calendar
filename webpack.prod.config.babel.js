var webpack = require('webpack');
var base = require('./webpack.base.config.babel');
var _ = require('lodash');

module.exports = _.merge(base, {
  output: {
    path: '/Volumes/tlt-calendar-api/public',
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    ...base.plugins,
    /*
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    */
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
});

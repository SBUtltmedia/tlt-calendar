var webpack = require('webpack');
var path = require('path');

module.exports = {
     entry: './src/index.js',
     devtool: '#eval-cheap-module-source-map',
     output: {
         path: './',
         filename: 'bundle.js'
     },
     plugins: [
         new webpack.ProvidePlugin({ 'React': 'react'})
     ],
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: 'style!css!sass'
        }, {
           test: /\.css$/,
           loader: 'style!css'
        }, {
            test: /\.png?$/,
            exclude: /node_modules/,
            loader: "url-loader?limit=100000"
        }, {
            test: /\.gif?$/,
            loader: "url-loader?mimetype=image/png"
        },{
            test: /\.jpg?$/,
            loader: "url-loader?limit=10000"
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader?name=[name].[ext]"
        }]
     },
     resolve: {
        root: path.resolve(__dirname),
        img: 'img'
     }
 };

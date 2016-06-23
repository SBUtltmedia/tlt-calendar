var webpack = require('webpack');

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
            loader: "url-loader?limit=10000"
        }]
     },
     resolve: {
        alias: {
            "ag-grid-root" : __dirname + "/node_modules/ag-grid"
        }
    }
 };

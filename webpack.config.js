var webpack = require('webpack');

module.exports = {
     entry: './src/index.js',
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
             loader: 'babel-loader',
         }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
           test: /\.css$/,
           loader: 'style!css'
       }]
     }
 };

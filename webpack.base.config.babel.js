var webpack = require('webpack');
var path = require('path');

module.exports = {
   entry: './src/index.js',
   plugins: [
     new webpack.ProvidePlugin({ 'React': 'react' })
   ],
   module: {
     loaders: [{
       test: /\.js$/,
       include: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules/downloadbutton')],
       loader: 'babel-loader'
     }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
     test: /\.css$/,
     loader: 'style-loader!css'
    }, {
      test: /\.png?$/,
      exclude: /node_modules/,
      loader: "url-loader?limit=100000"
    }, {
      test: /\.gif?$/,
      loader: "url-loader?mimetype=image/png"
    },{
      test: /\.jpg?$/,
      loader: "url-loader?limit=100000"
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader?name=[name].[ext]"
    }]
   },
   resolve: {
     alias: {
      root: path.resolve(__dirname),
      img: 'img'
    }
   }
 };

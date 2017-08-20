var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dollarsign.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};

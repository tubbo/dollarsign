var path = require('path');

module.exports = {
  entry: './src/nquery.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '..')
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

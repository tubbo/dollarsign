var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dollarsign.js',
    library: 'dollarsign',
    libraryTarget: 'umd',
    umdNamedDefine: true
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

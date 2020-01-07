const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  }
};

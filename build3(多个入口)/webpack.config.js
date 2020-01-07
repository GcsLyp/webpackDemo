const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  //暴露出两个入口
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    header: path.resolve(__dirname, '../src/header.js'),
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist/build3')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: "index.html", //对应相应地模板
      chunks: ['main'] //对应暴露出的入口
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: "header.html",//对应相应地模板
      chunks: ['header'] //对应暴露出的入口
    }),
  ]
};

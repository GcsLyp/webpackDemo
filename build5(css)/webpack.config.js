const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      //打包为css文件
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
          // 'style-loader', 该loader和mini的插件会冲突
          'css-loader', {
          //自动添加浏览器前缀
          loader: 'postcss-loader',
          options: {
            plugin: [require('autoprefixer')]
          }
        }] //解析从右到左 先用css-loader打包
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader,
          // 'style-loader', 该loader和mini的插件会冲突
          'css-loader', {
          //自动添加浏览器前缀
          loader: 'postcss-loader',
          options: {
            plugin: [require('autoprefixer')]
          }
        }, 'less-loader']
      },
    ]
  }
};

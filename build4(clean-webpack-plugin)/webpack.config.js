const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    //还有其他用法可以自己配置，此处使用无配置的简易方法
    new CleanWebpackPlugin(), //直接清空掉打包的文件就是设置的 output的path
  ]
};

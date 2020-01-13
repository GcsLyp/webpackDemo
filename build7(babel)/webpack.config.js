const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'production',
  //polyfill解析api
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')],
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
        test: /\.js$/,
        use: {
          //解析ES5以上语法
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
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
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  }
};

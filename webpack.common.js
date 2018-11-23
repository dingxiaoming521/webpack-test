const glob = require("glob");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let plugins = [];
let htmlParams = {
  meta: { //生成meta标签
    viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0',
  },
  minify: {
    collapseWhitespace: false, // 去掉换行、元素之间的空格
    collapseBooleanAttributes: true, // 如 readonly="readonly" =》 readonly
    minifyCSS: true, // 压缩元素中的style和style标签
    minifyJS: true, // 压缩script,如括号中的空格
    removeComments: true, //去掉<!---->注释，ignoreCustomComments的不去掉
    ignoreCustomComments: [/^\#include/], // 跟removeComments配合，不去掉<!--#include-->
    removeScriptTypeAttributes: true, // 移除 script 中的 type="text/javascript"
    removeStyleLinkTypeAttributes: true, // 移除 style、link 中的 type="text/css"
    sortAttributes: true, // 排序元素属性，虽不改变文件大小，但会提高压缩成压缩文件时的压缩率
  },
  // 需要注入的js，与entryObject的key对应
  chunks: [],
  bundle: {},
  inject: true,
  chunksSortMode: "manual",
};
let entryObject = {}; 
{
  {
    const htmlSelector = path.resolve(__dirname, "dev") + "/**/*.html";
    glob.sync(htmlSelector).forEach(function(fileFullPath) {
      let fileFullName = fileFullPath.replace(/.*[\\\/]view[\\\/]/, "view/").replace(/\.html$/, "");
      let entryName = fileFullName.replace(/view/, "assets/js");
      entryObject[entryName] = fileFullPath.replace(/view/, "assets/js").replace(/html$/, "js");
      
      // 输出文件
      htmlParams.filename = fileFullName + ".html";
      htmlParams.template = fileFullPath;
      htmlParams.chunks = [entryName];
      plugins.push(new HtmlWebpackPlugin(htmlParams));
    });
  }
}
// console.log(JSON.stringify(entryObject));
// console.log(plugins);
module.exports = {
  entry: entryObject,
  plugins: plugins,
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-import'), // 解决css中import其他css
                require('autoprefixer')
              ]
            }
          }
        ]
      }, {
        test: /\.js$/i,
        include: path.resolve(__dirname, "dev"),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: { plugins: [require('autoprefixer')] }
          },
          'sass-loader'
        ]
      }
    ]
  },
  mode: "production"
};
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理dist目录
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css优化处理
module.exports = merge(common, {
	output: {
    path: path.resolve(__dirname, 'sit'),
  },
  devServer: {
  	contentBase: path.join(__dirname, 'sit'),
  	compress: true,
    hot: true,
    open: true,// 打开浏览器
    openPage: "view/index.html", // 打开浏览器时的首页
  },
  devtool: 'source-map',
  plugins: [
  	new CleanWebpackPlugin(path.resolve(__dirname, 'sit')),
  	new webpack.HotModuleReplacementPlugin(), //模块热更新
  	new webpack.NamedModulesPlugin(), //模块热更新
  ]
});
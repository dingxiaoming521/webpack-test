const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理dist目录
module.exports = merge(common, {
	output: {
    path: path.resolve(__dirname, 'sit'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'sit'),
    hot: true
  },
  devtool: 'source-map',
  plugins: [
  	new CleanWebpackPlugin(path.resolve(__dirname, 'sit')),
  	new webpack.HotModuleReplacementPlugin(), //模块热更新
  	new webpack.NamedModulesPlugin(), //模块热更新
  ],
});
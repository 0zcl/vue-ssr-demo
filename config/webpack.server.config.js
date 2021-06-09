const path = require('path')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  target: 'node',
  devtool: 'source-map',
  entry: {
    server: path.join(__dirname, '../src/entry-server.js'),
  },
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  plugins: [
    new VueSSRServerPlugin(),
    // new HtmlWebpackPlugin({
    //   minify: {
    //     collapseWhitespace: true, //压缩代码
    //     removeComments: false //不移除注释
    //   },
    //   template: path.resolve(__dirname, '../src/index.ssr.html'),
    //   filename: 'index.ssr.html',
    //   files: {
    //     js: 'client.bundle.js'
    //   },
    //   excludeChunks: ['server']
    // })
  ]
})
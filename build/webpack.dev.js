const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const path = require('path')

const devConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"], // getConditionalLoader()
      },
    ],
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    static: path.resolve(__dirname, '../dist'),
    port: 3000,
    open: true,
    hot: true
  },
}

module.exports = merge(commonConfig, devConfig)

const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const path = require('path')

const devConfig = {
  mode,
  devServer: {
    static: path.resolve(__dirname, '../dist'),
    port: 3000,
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.styl(us)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              //启用/禁用或者设置在 css-loader 前应用的 loader 数量
              importLoaders: 2
            }
          },
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js'
  }
}

module.exports = merge(commonConfig, devConfig)

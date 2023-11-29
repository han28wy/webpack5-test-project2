const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
// const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const webpackConfig = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve('src'), path.resolve('test'), path.resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /.vue$/,
        loader: "vue-loader" ,
      },
      {
        test: /\.(ttf|woff|woff2|eto|svg)$/,
        exclude: path.resolve(__dirname, '../src/assets/img'),
        type: 'asset',
        parser: {
          dataUrlCondition: {
            //如果一个模块源码大小小于 maxSize，那么模块会被作为一个 Base64 编码的字符串注入到包中， 否则模块文件会被生成到输出的目标目录中。
            maxSize: 4 * 1024 // 4kb
          }
        },
        generator: {
          filename: isProduction
            ? 'static/fonts/[name].[contenthash:8][ext]'
            : 'static/fonts/[name][ext]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: path.resolve(__dirname, '../src/assets/fonts'),
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        },
        generator: {
          filename: isProduction ? 
          'static/img/[name].[contenthash:8][ext]' :
          'static/img/[name][ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset/resource',
        generator: {
          filename: isProduction ? 
          'static/video/[name].[contenthash:8][ext]' :
          'static/video/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'This is a template'
    }),
    new VueLoaderPlugin()
  ],
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 这个注释了好像也可以
      '@': path.resolve(__dirname, '../src'),
    },
    
    extensions: ['.js', '.vue', '.less', '.json']
  },
}

module.exports = webpackConfig

// module.exports = vuxLoader.merge(webpackConfig, {
//   plugins: ['vux-ui']
// });

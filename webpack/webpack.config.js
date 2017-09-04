var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var serverConfig = require("../bin/config");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT_DIR = path.join(__dirname, "../");
// const BUILD_FOLDER = "public";
const PUBLIC_FOLDER = "www";
const BUILD_FOLDER = "dist";
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const publicPath = "/"; //`http://127.0.0.1:${serverConfig.port}/`; "/"

const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 创建多个实例
const extractCSS = new ExtractTextPlugin('css/weui.min.css');
const extractLESS = new ExtractTextPlugin('css/style.css');
// const extractLess = new ExtractTextPlugin({
//   filename: "[name].[contenthash].css",
//   disable: process.env.NODE_ENV === "local"
// });

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devConfig = {
  context: path.join(ROOT_DIR, "client"),
  entry: {
    page1: [hotMiddlewareScript, './page1/index.js'],
    init: [hotMiddlewareScript, './common/common.js'],
  },
  // entry: entries(),
  output: {
    filename: './[name]/bundle.js',
    path: path.join(ROOT_DIR, BUILD_FOLDER), //必须是绝对地址
    publicPath: publicPath // "/"
  },
  devtool: 'eval-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }, {
      test: /\.(png|jpg)$/,
      use: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
    }, {
      test: /\.css$/,
      loader: extractCSS.extract({
        use: ["css-loader"],
        fallback: "style-loader"
      })
    }, {
      test: /\.less$/,
      loader: extractLESS.extract({
        use: ["css-loader","less-loader"],
        fallback: "style-loader"
      })
    }, {
    //   test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
    //   loader: 'url-loader?limit=1&name=assets/img/[sha512:hash:base64:7].[ext]'
    // }, {
      test: /\.json$/,
      loader: 'file-loader?name=./[path][name].[ext]'
    }
    ]
  },
  plugins: [
    extractCSS,
    extractLESS,

    // product环境才需要
    // new CleanWebpackPlugin([BUILD_FOLDER], ROOT_DIR),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    //copy weui.min.css
    new CopyWebpackPlugin([
      {from: '../client/common/weui.min.css', to: 'css' }
    ]),
  ]
};


// function entries() {
//   var jsDir = path.resolve(__dirname, 'static/assets/js/page/**')
//   var entryFiles = glob.sync(jsDir + '/*.js');
//   var map = {};
//   for (var i = 0; i < entryFiles.length; i++) {
//     var filePath = entryFiles[i];
//     var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
//     var outPath = filePath.split(filename)[0].split("assets/js")[1];
//     map[(outPath + filename).substr(1)] = filePath;
//   }
//   return map;
// }

module.exports = devConfig;

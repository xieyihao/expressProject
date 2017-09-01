var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

const ROOT_DIR = path.join(__dirname, "../");
const BUILD_FOLDER = "public";

const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const devConfig = {
  context: path.join(ROOT_DIR, "clinic"),
  entry: {
    page1: ['./page1/', hotMiddlewareScript],
    // page2: ['./client/page2', hotMiddlewareScript]
  },
  // entry: entries(),
  output: {
    filename: './js/[name].js',
    path: path.join(ROOT_DIR, BUILD_FOLDER), //必须是绝对地址
    publicPath: "/"
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
      // exclude: /node_modules/,
      // loader: 'babel-loader',
      // loader: "babel",
      // query: {
      //   plugins: [
      //     ['transform-runtime'],
      //     // ['import', [{libraryName: "antd", style: true}]],
      //   ],
      //   presets: [
      //     "es2015",
      //     // "react"
      //   ],
      //   cacheDirectory: true
      // }
    }, {
      test: /\.(png|jpg)$/,
      use: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader?sourceMap',
        'resolve-url-loader',
        'sass-loader?sourceMap'
      ]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
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

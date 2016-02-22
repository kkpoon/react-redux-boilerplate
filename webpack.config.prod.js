var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    name: "web",
    entry: {
      bundle: "./src/web/index.jsx"
    },
    resolve: {
      extensions: ["", ".ts", ".tsx", ".coffee", ".js", ".jsx"]
    },
    output: {
      path: path.resolve(__dirname, 'public/lib'),
      publicPath: "lib/",
      filename: "[name].min.js"
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
        {
          test: /\.coffee$/,
          loader: "coffee-loader"
        },
        {
          test: /\.less$/,
          loader: "style!css!less"
        },
        {
          test: /\.css$/,
          loader: "style!css"
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*)?$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify("production")
        }
      }),
      new HtmlWebpackPlugin({
        inject: "body",
        hash: true,
        filename: '../index.html',
        template: 'src/html/index.template.html'
      })
    ]
  },
  {
    name: "servers",
    target: "node",
    externals: [nodeExternals()],
    entry: {
      app: "./src/servers/app.js"
    },
    resolve: {
      extensions: ["", ".js"]
    },
    output: {
      path: path.resolve(__dirname, 'lib/servers'),
      filename: "[name].js",
      libraryTarget: "commonjs2",
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify("production")
        }
      })
    ]
  }
];
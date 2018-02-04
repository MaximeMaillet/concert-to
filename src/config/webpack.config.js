require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

const config = {
  entry: './src/app/index.js',
  output: {
    path: path.resolve(__dirname, '../../build'),
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: './src/app/assets/styles/variables.scss'
              },
            }
          ],
        }))
      },
      {
        test: /\.(svg)$/,
        loader: 'file-loader?name=img/img-[hash:6].[ext]',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: 'eval-source-map'
};

module.exports = config;

console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`API_URL : ${process.env.API_URL}`);

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCSSAssets()
  );
}
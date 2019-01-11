// Webpack base config

const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
const CopyPlugin = require('copy-webpack-plugin')
const moduleResolvers = require('../moduleResolvers')

// * entry - configure entry point for babel polyfill
// * output - publicPath - needed to resolve bundle in sub routes
// * plugins - HtmlWebpackPlugin - needed to create the index.html with a script tag for the created JS bundle
// * resolve / modules - will make import paths shorter
module.exports = {
  entry: ['@babel/polyfill', './src/index'],
  output: {
    publicPath: '/',
  },
  plugins: [
    new HtmlWebPackPlugin({ template: './src/index.html' }),
    new DotenvPlugin({ path: './config/.env' }),
    new CopyPlugin([{ from: './src/globalStyles/favicon/', to: './' }]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.gql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'public/fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: moduleResolvers,
  },
}

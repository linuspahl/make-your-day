// Webpack base config

const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const moduleResolvers = require('../moduleResolvers')

// * entry - configure entry point for babel polyfill
// * plugins - HtmlWebpackPlugin - needed to create the index.html with a script tag for the created JS bundle
// * resolve / modules - will make import paths shorter
module.exports = {
  entry: ['@babel/polyfill', './src/index'],
  plugins: [
    new HtmlWebPackPlugin({ template: './src/index.html' }),
    new Dotenv({ path: './config/.env' }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  resolve: {
    modules: moduleResolvers,
  },
}

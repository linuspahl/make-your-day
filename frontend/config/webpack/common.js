// Webpack base config

const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const moduleResolvers = require('../moduleResolvers')

// * plugins - HtmlWebpackPlugin - needed to create the index.html with a script tag for the created JS bundle
// * resolve / modules - will make import paths shorter
module.exports = {
  plugins: [
    new HtmlWebPackPlugin({ template: './src/index.html' }),
    new Dotenv({ path: './config/.env' }),
  ],
  resolve: {
    modules: moduleResolvers,
  },
}

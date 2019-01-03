const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

// Webpack base config
//
// * plugins - HtmlWebpackPlugin - needed to create the index.html with a script tag for the created JS bundle
module.exports = {
  plugins: [new HtmlWebPackPlugin({ template: './src/index.html' })],
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
  },
}

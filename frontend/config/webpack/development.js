const common = require('./common.js')
const merge = require('webpack-merge')

// Webpack settings only needed for development
//
// * mode - will tell webpack to use its built-in optimizations
// * module - babel-loader - we need a different babel-loader config for development mode
// e.g. for the babel-plugin-styled-components plugin
// * devServer - webpack-dev-server settings
// (open - will open the browser on start)
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['babel-plugin-styled-components'],
          },
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: true,
  },
})

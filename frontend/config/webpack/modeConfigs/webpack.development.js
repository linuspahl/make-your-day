// Webpack settings only needed for development

/* eslint-disable @typescript-eslint/no-var-requires */
var path = require('path')

// * mode - will tell webpack to use its built-in optimizations
// * module - babel-loader - we need a different babel-loader config for development mode
// e.g. for the babel-plugin-styled-components plugin
// * devServer - webpack-dev-server settings
// (open - will open the browser on start)
const devConfig = () => ({
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../../../', 'developmentBuild'),
  },
  devServer: {
    historyApiFallback: true,
  },
})

module.exports = devConfig

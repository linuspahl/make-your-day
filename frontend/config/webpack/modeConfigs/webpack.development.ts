import path from 'path'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

// Webpack settings only needed for development
//
// * mode - will tell webpack to use its built-in optimizations
// * module - babel-loader - we need a different babel-loader config for development mode
// e.g. for the babel-plugin-styled-components plugin
// * devServer - webpack-dev-server settings
// (open - will open the browser on start)

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const devConfig = (): Configuration => ({
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'devBuild'),
  },
  devServer: {
    historyApiFallback: true,
  },
})

export default devConfig

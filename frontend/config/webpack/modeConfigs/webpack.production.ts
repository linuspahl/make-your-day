import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import { Configuration } from 'webpack'
import path from 'path'

// Webpack settings only needed for production
//
// * mode - will tell webpack to use its built-in optimizations
// * module - babel-loader - we need a different babel-loader config for production mode,
// to minify the app in an elegant way (compared with the minify plugin)
// * optimization - uglify - another useful minifyer

const prodConfig = (): Configuration => ({
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../../', 'productionBuild'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react', 'minify'],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
})

export default prodConfig

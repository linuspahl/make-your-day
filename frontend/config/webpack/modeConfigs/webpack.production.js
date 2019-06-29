// Webpack settings only needed for production

/* eslint-disable @typescript-eslint/no-var-requires */
var path = require('path')
var TerserPlugin = require('terser-webpack-plugin')

// Webpack settings only needed for production
//
// * mode - will tell webpack to use its built-in optimizations
// * module - babel-loader - we need a different babel-loader config for production mode,
// to minify the app in an elegant way (compared with the minify plugin)
// * optimization - uglify - another useful minifyer

const prodConfig = () => ({
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../../', 'productionBuild'),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
})

module.exports = prodConfig

// Want to have a look at the bundle size?
// Just add `--env.presets analyze` to your script

/* eslint-disable @typescript-eslint/no-var-requires */

const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const analyzePreset = () => ({
  plugins: [new WebpackBundleAnalyzer()],
})

module.exports = analyzePreset

// Want to have a look at the bundle size?
// Just add `--env.presets analyze` to your script

const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const analyzePreset = () => ({
  plugins: [new WebpackBundleAnalyzer()],
})

export default analyzePreset

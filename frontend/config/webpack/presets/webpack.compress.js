// Want to compress the bundle?
// Just add `--env.presets compress` to your script

/* eslint-disable @typescript-eslint/no-var-requires */
var CompressionPlugin = require('compression-webpack-plugin')

const compressPreset = () => ({
  plugins: [new CompressionPlugin({ algorithm: 'gzip', cache: true })],
})

module.exports = compressPreset

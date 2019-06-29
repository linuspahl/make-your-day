import { Configuration } from 'webpack'
import CompressionPlugin from 'compression-webpack-plugin'

// Want to compress the bundle?
// Just add `--env.presets compress` to your script

const compressPreset = (): Configuration => ({
  plugins: [new CompressionPlugin({ algorithm: 'gzip', cache: true })],
})

export default compressPreset

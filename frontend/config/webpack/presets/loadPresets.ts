// This file allows the dynamic usage of multiple presets
// you can add any webpack configuration and load it as a preset
// e.g. webpack-bundle-analyzer can be used with `--env.presets analyze`

// libraries
import merge from 'webpack-merge'
import { Configuration } from 'webpack'
// interfaces
import { WebpackConfigParams } from 'types/types'

const applyPresets = (env: WebpackConfigParams): Configuration => {
  const { presets } = env
  const mergedPresets = [].concat(...[presets])
  const mergedConfigs = mergedPresets.map(
    (presetName: WebpackConfigParams['mode']): Configuration =>
      presetName && require(`./webpack.${presetName}`).default()
  )
  return merge({}, ...mergedConfigs)
}

export default applyPresets

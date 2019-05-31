// This file allows the dynamic usage of multiple presets
// you can add any webpack configuration and load it as a preset
// e.g. webpack-bundle-analyzer can be used with `--env.presets analyze`

import merge from 'webpack-merge'

const applyPresets = env => {
  const { presets } = env
  const mergedPresets = [].concat(...[presets])
  const mergedConfigs = mergedPresets.map(
    presetName => presetName && require(`./webpack.${presetName}`).default()
  )
  return merge({}, ...mergedConfigs)
}

export default applyPresets

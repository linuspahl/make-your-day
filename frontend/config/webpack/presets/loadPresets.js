// This file allows the dynamic usage of multiple presets
// you can add any webpack configuration and load it as a preset
// e.g. webpack-bundle-analyzer can be used with `--env.presets analyze`

/* eslint-disable @typescript-eslint/no-var-requires */

// libraries
var merge = require('webpack-merge')

const applyPresets = env => {
  const { presets } = env
  const mergedPresets = [].concat(...[presets])
  const mergedConfigs = mergedPresets.map(
    presetName => presetName && require(`./webpack.${presetName}`)
  )
  return merge({}, ...mergedConfigs)
}

module.exports = applyPresets

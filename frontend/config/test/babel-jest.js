// Setup of babel-jest integration. Gets included in the jest-config.js.
// We need to use babel-jest createTransformer function to set the needed babel presets.
// This way we are able to avoid a .babelrc in the root directory.
// The babel presets for development / production environment are a part of the webpack config

// libraries
// We need to disable the es-lint for `require` here
// Because we need to use es5 for the jest config
// eslint-disable-next-line @typescript-eslint/no-var-requires
var babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
})

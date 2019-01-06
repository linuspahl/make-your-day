// Config file for testing with jest.
// Jest will use babel-jest as a transformer, to be able to test es5 code.
// This part could be placed in the package.json under a "jest" tag, as well, but we prefer a seperate config file.

const moduleResolvers = require('../moduleResolvers')

module.exports = {
  transform: {
    '^.+\\.js?$': './babel-jest.js',
  },
  collectCoverageFrom: ['../../src/**.{js}'],
  roots: ['../../'],
  moduleDirectories: moduleResolvers,
}

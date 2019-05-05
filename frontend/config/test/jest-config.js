// Config file for testing with jest.
// Jest will use babel-jest as a transformer, to be able to test es5 code.
// This part could be placed in the package.json under a 'jest' tag, as well, but we prefer a seperate config file.

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.js?$': './babel-jest.js',
    '^.+\\.gql?$': 'jest-transform-graphql',
  },
  collectCoverageFrom: ['../../src/**.{tsx}'],
  roots: ['../../'],
  testRegex: '.*\\.test\\.tsx$',
  moduleDirectories: ['./src', './node_modules', './config'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileMock.js',
  },
}

// Config file for testing with jest.
// Jest will use babel-jest as a transformer, to be able to test es5 code.
// This part could be placed in the package.json under a 'jest' tag, as well, but we prefer a seperate config file.

const jestDir = '<rootDir>/config/test'

module.exports = {
  rootDir: '../../',
  setupFilesAfterEnv: [`${jestDir}/utils/configureBeforeTests.ts`],
  coverageDirectory: `${jestDir}/coverage`,
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testRegex: '.*\\.test\\.(ts|tsx)$',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `${jestDir}/utils/fileMock`,
  },
  moduleDirectories: [
    './src',
    './node_modules',
    './config',
    './config/test/utils',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  globals: {
    CURRENT_ENV: 'jest',
  },
}

// Config file for testing with jest.
// Jest will use babel-jest as a transformer, to be able to test es5 code.
// This part could be placed in the package.json under a 'jest' tag, as well, but we prefer a seperate config file.

module.exports = {
  rootDir: '../../',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testRegex: '.*\\.test\\.tsx$',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/test/fileMock',
  },
  moduleDirectories: ['./src', './node_modules', './config'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
}

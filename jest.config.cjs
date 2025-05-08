module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],                 //Specify file extensions for test and component code
  coverageDirectory: 'coverage',                       //Specify directory for coverage reports
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],          //Specify the source code to obtain coverage from
  moduleNameMapper: {                                  //moduleNameMapper used to mock css style sheets to an empty styleMock.js, essentially ignoring them
    '\\.(css|less)$': '<rootDir>/src/assets/styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/assets/imageMock.js',
  },
};
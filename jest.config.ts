module.exports = {
  preset: 'ts-jest', // Use ts-jest preset to handle TypeScript files
  testEnvironment: 'node', // Set the test environment to Node.js
  testMatch: ['**/*.test.ts'], // Specify the pattern for test files
  moduleFileExtensions: ['ts', 'js'], // Recognize both TypeScript and JavaScript files
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest to transpile TypeScript files
  },
  roots: ['<rootDir>/tests'], // Only look for tests in the src directory
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Specify the path to your tsconfig.json
    },
  },
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: 'coverage', // Specify the directory for coverage reports
  coverageReporters: ['text', 'lcov'], // Specify the coverage report formats
  verbose: true,
};

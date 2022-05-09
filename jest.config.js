module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/plop-templates/',
    '<rootDir>/public/',
    '<rootDir>/scripts/',
    '<rootDir>/functions/',
    '<rootDir>/tests/',
  ],
};

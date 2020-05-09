module.exports = (wallaby) => ({
  tests: ['!node_modules/**', '!test/fixtures/**/*', 'src/**/*.test.js'],

  files: [
    '!node_modules/**',
    '!src/**/*.test.js',
    'package.json',
    'jest.setup.js',
    'src/**/*.js',
    'src/**/*.json',
    'test/fixtures/**/*',
    'test/jest*',
  ],

  env: {
    type: 'node',
  },

  testFramework: 'jest',

  setup: (wallaby) => {
    const { jest } = require('./package.json')

    wallaby.testFramework.configure(jest)
  },
})

module.exports = wallaby => ({
  files: ['!node_modules/**', '!src/**/*.test.js', 'src/**/*.js'],
  tests: ['!node_modules/**', 'src/**/*.test.js'],
  env: {
    type: 'node',
  },
  testFramework: 'jest',
})

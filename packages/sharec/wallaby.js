module.exports = wallaby => ({
  files: [
    '!node_modules/**',
    '!src/**/*.test.js',
    'src/**/*.js',
    'src/**/*.json',
    'src/**/*.yml',
    'src/**/*.yaml',
  ],
  tests: ['!node_modules/**', 'src/**/*.test.js'],
  env: {
    type: 'node',
  },
  testFramework: 'jest',
})

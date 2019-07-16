const { normalizePathSlashes } = require('../fs')

describe('normalizePathSlashes', () => {
  it('should transform windows-like slashes to normal', () => {
    expect(normalizePathSlashes(['foo\\bar.js', 'bar/baz.js'])).toEqual([
      'foo/bar.js',
      'bar/baz.js',
    ])
  })
})

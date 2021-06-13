'use strict'

var path = require('path')
var sep = path.sep
var nm = require('./support/match')

describe('nanomatch', function () {
  describe('posix paths', function () {
    it('should return an array of matches for a literal string', function () {
      nm(['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c'], '(a/b)', ['a/b'])
      nm(['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c'], 'a/b', ['a/b'])
    })

    it('should return an array of matches for an array of literal strings', function () {
      nm(['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c'], ['(a/b)', 'a/c'], ['a/b', 'a/c'])
      nm(['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c'], ['a/b', 'b/b'], ['a/b', 'b/b'])
    })

    it('should support regex logical or', function () {
      nm(['a/a', 'a/b', 'a/c'], ['a/(a|c)'], ['a/a', 'a/c'])
      nm(['a/a', 'a/b', 'a/c'], ['a/(a|b|c)', 'a/b'], ['a/a', 'a/b', 'a/c'])
    })

    it('should support regex ranges', function () {
      nm(['a/a', 'a/b', 'a/c'], 'a/[b-c]', ['a/b', 'a/c'])
      nm(['a/a', 'a/b', 'a/c', 'a/x/y', 'a/x'], 'a/[a-z]', ['a/a', 'a/b', 'a/c', 'a/x'])
    })

    it('should support single globs (*)', function () {
      var fixtures = ['a', 'b', 'a/a', 'a/b', 'a/c', 'a/x', 'a/a/a', 'a/a/b', 'a/a/a/a', 'a/a/a/a/a', 'x/y', 'z/z']
      nm(fixtures, ['*'], ['a', 'b'])
      nm(fixtures, ['*/*'], ['a/a', 'a/b', 'a/c', 'a/x', 'x/y', 'z/z'])
      nm(fixtures, ['*/*/*'], ['a/a/a', 'a/a/b'])
      nm(fixtures, ['*/*/*/*'], ['a/a/a/a'])
      nm(fixtures, ['*/*/*/*/*'], ['a/a/a/a/a'])
      nm(fixtures, ['a/*'], ['a/a', 'a/b', 'a/c', 'a/x'])
      nm(fixtures, ['a/*/*'], ['a/a/a', 'a/a/b'])
      nm(fixtures, ['a/*/*/*'], ['a/a/a/a'])
      nm(fixtures, ['a/*/*/*/*'], ['a/a/a/a/a'])
      nm(fixtures, ['a/*/a'], ['a/a/a'])
      nm(fixtures, ['a/*/b'], ['a/a/b'])
    })

    it('should support globstars (**)', function () {
      var fixtures = ['a', 'a/', 'a/a', 'a/b', 'a/c', 'a/x', 'a/x/y', 'a/x/y/z']
      nm(fixtures, ['*'], ['a', 'a/'])
      nm(fixtures, ['*/'], ['a/'])
      nm(fixtures, ['*/*'], ['a/a', 'a/b', 'a/c', 'a/x'])
      nm(fixtures, ['**'], fixtures)
      nm(fixtures, ['**/a'], ['a', 'a/', 'a/a'])
      nm(fixtures, ['a/*'], ['a/a', 'a/b', 'a/c', 'a/x'])
      nm(fixtures, ['a/**'], ['a/', 'a/a', 'a/b', 'a/c', 'a/x', 'a/x/y', 'a/x/y/z'])
      nm(fixtures, ['a/**/*'], ['a/a', 'a/b', 'a/c', 'a/x', 'a/x/y', 'a/x/y/z'])
      nm(fixtures, ['a/**/**/*'], ['a/a', 'a/b', 'a/c', 'a/x', 'a/x/y', 'a/x/y/z'])
      nm(['a/b/foo/bar/baz.qux'], 'a/b/**/bar/**/*.*', ['a/b/foo/bar/baz.qux'])
      nm(['a/b/bar/baz.qux'], 'a/b/**/bar/**/*.*', ['a/b/bar/baz.qux'])
    })

    it('should support negation patterns', function () {
      var fixtures = ['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c']
      nm(fixtures, ['!a/b'], ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
      nm(fixtures, ['*/*', '!a/b', '!*/c'], ['a/a', 'b/a', 'b/b'])
      nm(fixtures, ['!a/b', '!*/c'], ['a/a', 'b/a', 'b/b'])
      nm(fixtures, ['!a/b', '!a/c'], ['a/a', 'b/a', 'b/b', 'b/c'])
      nm(fixtures, ['!a/(b)'], ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
      nm(fixtures, ['!(a/b)'], ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
    })

    it('should work with file extensions', function () {
      var fixtures = ['a.txt', 'a/b.txt', 'a/x/y.txt', 'a/x/y/z']
      nm(fixtures, ['a/**/*.txt'], ['a/b.txt', 'a/x/y.txt'])
      nm(fixtures, ['a/*.txt'], ['a/b.txt'])
      nm(fixtures, ['a*.txt'], ['a.txt'])
      nm(fixtures, ['*.txt'], ['a.txt'])
    })

    it('should match literal brackets', function () {
      nm(['a [b]'], 'a \\[b\\]', ['a [b]'])
      nm(['a [b] c'], 'a [b] c', ['a [b] c'])
      nm(['a [b]'], 'a \\[b\\]*', ['a [b]'])
      nm(['a [bc]'], 'a \\[bc\\]*', ['a [bc]'])
      nm(['a [b]', 'a [b].js'], 'a \\[b\\].*', ['a [b].js'])
    })
  })

  describe('windows paths', function () {
    beforeEach(function () {
      path.sep = '\\'
    })
    afterEach(function () {
      path.sep = sep
    })

    it('should return an array of matches for a literal string', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c', 'b\\a', 'b\\b', 'b\\c']
      nm(fixtures, '(a/b)', ['a/b'])
      nm(fixtures, 'a/b', ['a/b'])
      nm(fixtures, '(a/b)', ['a\\b'], { unixify: false })
      nm(fixtures, 'a/b', ['a\\b'], { unixify: false })
    })

    it('should return an array of matches for an array of literal strings', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c', 'b\\a', 'b\\b', 'b\\c']
      nm(fixtures, ['(a/b)', 'a/c'], ['a/b', 'a/c'])
      nm(fixtures, ['a/b', 'b/b'], ['a/b', 'b/b'])
      nm(fixtures, ['(a/b)', 'a/c'], ['a\\b', 'a\\c'], { unixify: false })
      nm(fixtures, ['a/b', 'b/b'], ['a\\b', 'b\\b'], { unixify: false })
    })

    it('should support regex logical or', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c']
      nm(fixtures, ['a/(a|c)'], ['a/a', 'a/c'])
      nm(fixtures, ['a/(a|b|c)', 'a/b'], ['a/a', 'a/b', 'a/c'])
      nm(fixtures, ['a/(a|c)'], ['a\\a', 'a\\c'], { unixify: false })
      nm(fixtures, ['a/(a|b|c)', 'a/b'], ['a\\a', 'a\\b', 'a\\c'], { unixify: false })
    })

    it('should support regex ranges', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c', 'a\\x\\y', 'a\\x']
      nm(fixtures, 'a/[b-c]', ['a/b', 'a/c'])
      nm(fixtures, 'a/[a-z]', ['a/a', 'a/b', 'a/c', 'a/x'])
      nm(fixtures, 'a/[b-c]', ['a\\b', 'a\\c'], { unixify: false })
      nm(fixtures, 'a/[a-z]', ['a\\a', 'a\\b', 'a\\c', 'a\\x'], { unixify: false })
    })

    it('should support single globs (*)', function () {
      var fixtures = [
        'a',
        'b',
        'a\\a',
        'a\\b',
        'a\\c',
        'a\\x',
        'a\\a\\a',
        'a\\a\\b',
        'a\\a\\a\\a',
        'a\\a\\a\\a\\a',
        'x\\y',
        'z\\z',
      ]
      nm(fixtures, ['*'], ['a', 'b'])
      nm(fixtures, ['*/*'], ['a/a', 'a/b', 'a/c', 'a/x', 'x/y', 'z/z'])
      nm(fixtures, ['*/*/*'], ['a/a/a', 'a/a/b'])
      nm(fixtures, ['*/*/*/*'], ['a/a/a/a'])
      nm(fixtures, ['*/*/*/*/*'], ['a/a/a/a/a'])
      nm(fixtures, ['a/*'], ['a/a', 'a/b', 'a/c', 'a/x'])
      nm(fixtures, ['a/*/*'], ['a/a/a', 'a/a/b'])
      nm(fixtures, ['a/*/*/*'], ['a/a/a/a'])
      nm(fixtures, ['a/*/*/*/*'], ['a/a/a/a/a'])
      nm(fixtures, ['a/*/a'], ['a/a/a'])
      nm(fixtures, ['a/*/b'], ['a/a/b'])

      nm(fixtures, ['*/*'], ['a\\a', 'a\\b', 'a\\c', 'a\\x', 'x\\y', 'z\\z'], { unixify: false })
      nm(fixtures, ['*/*/*'], ['a\\a\\a', 'a\\a\\b'], { unixify: false })
      nm(fixtures, ['*/*/*/*'], ['a\\a\\a\\a'], { unixify: false })
      nm(fixtures, ['*/*/*/*/*'], ['a\\a\\a\\a\\a'], { unixify: false })
      nm(fixtures, ['a/*'], ['a\\a', 'a\\b', 'a\\c', 'a\\x'], { unixify: false })
      nm(fixtures, ['a/*/*'], ['a\\a\\a', 'a\\a\\b'], { unixify: false })
      nm(fixtures, ['a/*/*/*'], ['a\\a\\a\\a'], { unixify: false })
      nm(fixtures, ['a/*/*/*/*'], ['a\\a\\a\\a\\a'], { unixify: false })
      nm(fixtures, ['a/*/a'], ['a\\a\\a'], { unixify: false })
      nm(fixtures, ['a/*/b'], ['a\\a\\b'], { unixify: false })
    })

    it('should support globstars (**)', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c', 'a\\x', 'a\\x\\y', 'a\\x\\y\\z']
      var expected = ['a/a', 'a/b', 'a/c', 'a/x', 'a/x/y', 'a/x/y/z']
      nm(fixtures, ['a/**'], expected)
      nm(fixtures, ['a/**/*'], expected)
      nm(fixtures, ['a/**/**/*'], expected)

      nm(fixtures, ['a/**'], fixtures, { unixify: false })
      nm(fixtures, ['a/**/*'], fixtures, { unixify: false })
      nm(fixtures, ['a/**/**/*'], fixtures, { unixify: false })
    })

    it('should work with file extensions', function () {
      var fixtures = ['a.txt', 'a\\b.txt', 'a\\x\\y.txt', 'a\\x\\y\\z']
      nm(fixtures, ['a/**/*.txt'], ['a\\b.txt', 'a\\x\\y.txt'], { unixify: false })
      nm(fixtures, ['a/*/*.txt'], ['a\\x\\y.txt'], { unixify: false })
      nm(fixtures, ['a/*.txt'], ['a\\b.txt'], { unixify: false })
      nm(fixtures, ['a/**/*.txt'], ['a/b.txt', 'a/x/y.txt'])
      nm(fixtures, ['a/*/*.txt'], ['a/x/y.txt'])
      nm(fixtures, ['a/*.txt'], ['a/b.txt'])
      nm(fixtures, ['a*.txt'], ['a.txt'])
      nm(fixtures, ['a.txt'], ['a.txt'])
    })

    it('should support negation patterns', function () {
      var fixtures = ['a', 'a\\a', 'a\\b', 'a\\c', 'b\\a', 'b\\b', 'b\\c']
      nm(fixtures, ['!a/b'], ['a', 'a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
      nm(fixtures, ['*/*', '!a/b', '!*/c'], ['a/a', 'b/a', 'b/b'])
      nm(fixtures, ['!*/c'], ['a', 'a/a', 'a/b', 'b/a', 'b/b'])
      nm(fixtures, ['!a/b', '!*/c'], ['a', 'a/a', 'b/a', 'b/b'])
      nm(fixtures, ['!a/b', '!a/c'], ['a', 'a/a', 'b/a', 'b/b', 'b/c'])
      nm(fixtures, ['!a/(b)'], ['a', 'a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
      nm(fixtures, ['!(a/b)'], ['a', 'a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
    })
  })
})

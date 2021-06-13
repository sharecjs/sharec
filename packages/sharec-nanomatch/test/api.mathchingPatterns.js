'use strict'

var assert = require('assert')
var path = require('path')
var nm = require('./support/match')
var sep = path.sep

describe('.matchingPatterns method', function () {
  describe('posix paths', function () {
    it('should return an array of matched patterns for a literal string', function () {
      assert.deepEqual(nm.matchingPatterns(['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c'], ['(a/b)']), ['(a/b)'])
      assert.deepEqual(nm.matchingPatterns(['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c'], ['a/b']), ['a/b'])
      assert.deepEqual(nm.matchingPatterns(['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c'], ['(a/d)']), [])
      assert.deepEqual(nm.matchingPatterns(['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c'], ['a/d']), [])
    })

    it('should return an array of matches for an array of literal strings', function () {
      assert.deepEqual(nm.matchingPatterns(['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c'], ['(a/b)', 'a/c']), [
        '(a/b)',
        'a/c',
      ])
      assert.deepEqual(nm.matchingPatterns(['a/a', 'a/b', 'a/c', 'b/a'], ['a/b']), ['a/b'])
    })

    it('should support regex logical or', function () {
      assert.deepEqual(nm.matchingPatterns(['a/a', 'a/b', 'a/c'], ['a/(a|c)']), ['a/(a|c)'])
      assert.deepEqual(nm.matchingPatterns(['a/a', 'a/b', 'a/c'], ['a/(a|b|c)', 'a/b']), ['a/(a|b|c)', 'a/b'])
    })

    it('should support regex ranges', function () {
      assert.deepEqual(nm.matchingPatterns(['a/a', 'a/b', 'a/c'], ['a/[b-c]']), ['a/[b-c]'])
      assert.deepEqual(nm.matchingPatterns(['a/a', 'a/b', 'a/c', 'a/x/y', 'a/x'], ['a/[a-z]']), ['a/[a-z]'])
    })

    it('should support single globs (*)', function () {
      var fixtures = ['a', 'b', 'a/a', 'a/b', 'a/c', 'a/x', 'a/a/a', 'a/a/b', 'a/a/a/a', 'a/a/a/a/a', 'x/y', 'z/z']
      assert.deepEqual(nm.matchingPatterns(fixtures, ['*']), ['*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*']), ['*/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*/*']), ['*/*/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*/*/*']), ['*/*/*/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*/*/*/*']), ['*/*/*/*/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*']), ['a/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*']), ['a/*/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*/*']), ['a/*/*/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*/*/*']), ['a/*/*/*/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/a']), ['a/*/a'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/b']), ['a/*/b'])
    })

    it('should support globstars (**)', function () {
      var fixtures = ['a', 'a/', 'a/a', 'a/b', 'a/c', 'a/x', 'a/x/y', 'a/x/y/z']
      assert.deepEqual(nm.matchingPatterns(fixtures, ['*']), ['*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['*/']), ['*/'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*']), ['*/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['**']), ['**'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['**/a']), ['**/a'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*']), ['a/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**']), ['a/**'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**/*']), ['a/**/*'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**/**/*']), ['a/**/**/*'])
      assert.deepEqual(nm.matchingPatterns(['a/b/foo/bar/baz.qux'], ['a/b/**/bar/**/*.*']), ['a/b/**/bar/**/*.*'])
      assert.deepEqual(nm.matchingPatterns(['a/b/bar/baz.qux'], ['a/b/**/bar/**/*.*']), ['a/b/**/bar/**/*.*'])
    })

    it('should work with file extensions', function () {
      var fixtures = ['a.txt', 'a/b.txt', 'a/x/y.txt', 'a/x/y/z']
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**/*.txt']), ['a/**/*.txt'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*.txt']), ['a/*.txt'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['a*.txt']), ['a*.txt'])
      assert.deepEqual(nm.matchingPatterns(fixtures, ['*.txt']), ['*.txt'])
    })

    it('should match literal brackets', function () {
      assert.deepEqual(nm.matchingPatterns(['a [b]'], ['a \\[b\\]']), ['a \\[b\\]'])
      assert.deepEqual(nm.matchingPatterns(['a [b] c'], ['a [b] c']), ['a [b] c'])
      assert.deepEqual(nm.matchingPatterns(['a [b]'], ['a \\[b\\]*']), ['a \\[b\\]*'])
      assert.deepEqual(nm.matchingPatterns(['a [bc]'], ['a \\[bc\\]*']), ['a \\[bc\\]*'])
      assert.deepEqual(nm.matchingPatterns(['a [b]', 'a [b].js'], ['a \\[b\\].*']), ['a \\[b\\].*'])
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
        assert.deepEqual(nm.matchingPatterns(fixtures, ['(a/b)']), ['(a/b)'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/b']), ['a/b'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['(a/b)']), ['(a/b)'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/b']), ['a/b'])
      })

      it('should return an array of matches for an array of literal strings', function () {
        var fixtures = ['a\\a', 'a\\b', 'a\\c', 'b\\a', 'b\\b', 'b\\c']
        assert.deepEqual(nm.matchingPatterns(fixtures, ['(a/b)', 'a/c']), ['(a/b)', 'a/c'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/b', 'b/b']), ['a/b', 'b/b'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['(a/b)', 'a/c']), ['(a/b)', 'a/c'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/b', 'b/b']), ['a/b', 'b/b'])
      })

      it('should support regex logical or', function () {
        var fixtures = ['a\\a', 'a\\b', 'a\\c']
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/(a|c)']), ['a/(a|c)'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/(a|b|c)', 'a/b']), ['a/(a|b|c)', 'a/b'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/(a|c)']), ['a/(a|c)'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/(a|b|c)', 'a/b']), ['a/(a|b|c)', 'a/b'])
      })

      it('should support regex ranges', function () {
        var fixtures = ['a\\a', 'a\\b', 'a\\c', 'a\\x\\y', 'a\\x']
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/[b-c]']), ['a/[b-c]'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/[a-z]']), ['a/[a-z]'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/[b-c]']), ['a/[b-c]'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/[a-z]']), ['a/[a-z]'])
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
        assert.deepEqual(nm.matchingPatterns(fixtures, ['*']), ['*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*']), ['*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*/*']), ['*/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*/*/*']), ['*/*/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*/*/*/*']), ['*/*/*/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*']), ['a/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*']), ['a/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*/*']), ['a/*/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*/*/*']), ['a/*/*/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/a']), ['a/*/a'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/b']), ['a/*/b'])

        assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*']), ['*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*/*']), ['*/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*/*/*']), ['*/*/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['*/*/*/*/*']), ['*/*/*/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*']), ['a/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*']), ['a/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*/*']), ['a/*/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*/*/*']), ['a/*/*/*/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/a']), ['a/*/a'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/b']), ['a/*/b'])
      })

      it('should support globstars (**)', function () {
        var fixtures = ['a\\a', 'a\\b', 'a\\c', 'a\\x', 'a\\x\\y', 'a\\x\\y\\z']
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**']), ['a/**'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**/*']), ['a/**/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**/**/*']), ['a/**/**/*'])

        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**']), ['a/**'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**/*']), ['a/**/*'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**/**/*']), ['a/**/**/*'])
      })

      it('should work with file extensions', function () {
        var fixtures = ['a.txt', 'a\\b.txt', 'a\\x\\y.txt', 'a\\x\\y\\z']
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**/*.txt']), ['a/**/*.txt'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*.txt']), ['a/*/*.txt'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*.txt']), ['a/*.txt'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/**/*.txt']), ['a/**/*.txt'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*/*.txt']), ['a/*/*.txt'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a/*.txt']), ['a/*.txt'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a*.txt']), ['a*.txt'])
        assert.deepEqual(nm.matchingPatterns(fixtures, ['a.txt']), ['a.txt'])
      })
    })
  })
})

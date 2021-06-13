'use strict'

var path = require('path')
var sep = path.sep
var nm = require('./support/match')

describe('.not method', function () {
  describe('posix paths', function () {
    it('should return an array of matches for a literal string', function () {
      var fixtures = ['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c']
      nm.not(fixtures, '(a/b)', ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
      nm.not(fixtures, 'a/b', ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
    })

    it('should support regex logical or', function () {
      var fixtures = ['a/a', 'a/b', 'a/c']
      nm.not(fixtures, 'a/(a|c)', ['a/b'])
      nm.not(fixtures, 'a/(a|b|c)', [])
    })

    it('should support regex ranges', function () {
      var fixtures = ['a/a', 'a/b', 'a/c', 'a/x/y', 'a/x']
      nm.not(fixtures, 'a/[b-c]', ['a/a', 'a/x/y', 'a/x'])
      nm.not(fixtures, 'a/[a-z]', ['a/x/y'])
    })

    it('should support globs (*)', function () {
      var fixtures = ['a/a', 'a/b', 'a/c', 'a/x', 'a/a/a', 'a/a/b', 'a/a/a/a', 'a/a/a/a/a']
      nm.not(fixtures, 'a/*', ['a/a/a', 'a/a/b', 'a/a/a/a', 'a/a/a/a/a'])
      nm.not(fixtures, 'a/*/a', ['a/a', 'a/b', 'a/c', 'a/x', 'a/a/b', 'a/a/a/a', 'a/a/a/a/a'])
      nm.not(fixtures, 'a/*/*', ['a/a', 'a/b', 'a/c', 'a/x', 'a/a/a/a', 'a/a/a/a/a'])
      nm.not(fixtures, 'a/*/*/*', ['a/a', 'a/b', 'a/c', 'a/x', 'a/a/a', 'a/a/b', 'a/a/a/a/a'])
      nm.not(fixtures, 'a/*/*/*/*', ['a/a', 'a/b', 'a/c', 'a/x', 'a/a/a', 'a/a/b', 'a/a/a/a'])
    })

    it('should support globstars (**)', function () {
      var fixtures = ['a/a', 'a/b', 'a/c', 'a/x', 'a/x/y', 'a/x/y/z']
      nm.not(fixtures, 'a/**', [])
      nm.not(fixtures, 'a/**/*', [])
      nm.not(fixtures, 'a/**/**/*', [])
    })

    it('should support negation patterns', function () {
      var fixtures = ['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c']
      nm.not(fixtures, '!a/b', ['a/b'])
      nm.not(fixtures, '!a/(b)', ['a/b'])
      nm.not(fixtures, '!(a/b)', ['a/b'])
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
      var fixtures = ['a', 'a\\a', 'a\\b', 'a\\c', 'b\\a', 'b\\b', 'b\\c']
      nm.not(fixtures, '(a/b)', ['a', 'a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
      nm.not(fixtures, 'a/b', ['a', 'a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
    })

    it('should support regex logical or', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c']
      nm.not(fixtures, 'a/(a|c)', ['a/b'])
      nm.not(fixtures, 'a/(a|b|c)', [])
    })

    it('should support regex ranges', function () {
      var fixtures = ['.\\a\\a', 'a\\a', 'a\\b', 'a\\c', 'a\\x\\y', 'a\\x']
      nm.not(fixtures, '[a-c]/[a-c]', ['a/x', 'a/x/y'])
      nm.not(fixtures, 'a/[b-c]', ['a/a', 'a/x', 'a/x/y'])
      nm.not(fixtures, 'a/[a-z]', ['a/x/y'])
    })

    it('should support globs (*)', function () {
      var fixtures = [
        'a\\a',
        'a/a',
        'a\\b',
        '.\\a\\b',
        'a\\c',
        'a\\x',
        'a\\a\\a',
        'a\\a\\b',
        'a\\a\\a\\a',
        'a\\a\\a\\a\\a',
      ]
      nm.not(fixtures, 'a/*', ['a/a/a', 'a/a/b', 'a/a/a/a', 'a/a/a/a/a'])
      nm.not(fixtures, 'a/*/a', ['a/a', 'a/b', 'a/c', 'a/x', 'a/a/b', 'a/a/a/a', 'a/a/a/a/a'])
      nm.not(fixtures, 'a/*/*', ['a/a', 'a/b', 'a/c', 'a/x', 'a/a/a/a', 'a/a/a/a/a'])
      nm.not(fixtures, 'a/*/*/*', ['a/a', 'a/b', 'a/c', 'a/x', 'a/a/a', 'a/a/b', 'a/a/a/a/a'])
      nm.not(fixtures, 'a/*/*/*/*', ['a/a', 'a/b', 'a/c', 'a/x', 'a/a/a', 'a/a/b', 'a/a/a/a'])
    })

    it('should support globstars (**)', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c', 'a\\x', 'a\\x\\y', 'a\\x\\y\\z']
      var expected = ['a/a', 'a/b', 'a/c', 'a/x', 'a/x/y', 'a/x/y/z']
      nm.not(fixtures, '*', expected)
      nm.not(fixtures, '**', [])
      nm.not(fixtures, '*/*', ['a/x/y', 'a/x/y/z'])
      nm.not(fixtures, 'a/**', [])
      nm.not(fixtures, 'a/x/**', ['a/a', 'a/b', 'a/c', 'a/x'])
      nm.not(fixtures, 'a/**/*', [])
      nm.not(fixtures, 'a/**/**/*', [])
    })

    it('should support negation patterns', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c', 'b\\a', 'b\\b', 'b\\c']
      var expected = ['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c']
      nm.not(fixtures, '!**', expected)
      nm.not(fixtures, '!*/*', expected)
      nm.not(fixtures, '!*', [])
      nm.not(fixtures, '!a/b', ['a/b'])
      nm.not(fixtures, '!a/(b)', ['a/b'])
      nm.not(fixtures, '!(a/b)', ['a/b'])
    })
  })
})

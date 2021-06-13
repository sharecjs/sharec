'use strict'

var path = require('path')
var nm = require('./support/match')

describe('.match method', function () {
  describe('posix paths', function () {
    it('should return an array of matches for a literal string', function () {
      var fixtures = ['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c']
      nm(fixtures, '(a/b)', ['a/b'])
      nm(fixtures, 'a/b', ['a/b'])
    })

    it('should support regex logical or', function () {
      var fixtures = ['a/a', 'a/b', 'a/c']
      nm(fixtures, 'a/(a|c)', ['a/a', 'a/c'])
      nm(fixtures, 'a/(a|b|c)', ['a/a', 'a/b', 'a/c'])
    })

    it('should support regex ranges', function () {
      var fixtures = ['a/a', 'a/b', 'a/c', 'a/x/y', 'a/x']
      nm(fixtures, 'a/[b-c]', ['a/b', 'a/c'])
      nm(fixtures, 'a/[a-z]', ['a/a', 'a/b', 'a/c', 'a/x'])
    })

    it('should support negation patterns', function () {
      var fixtures = ['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c']
      nm(fixtures, '!*/*', [])
      nm(fixtures, '!*/b', ['a/a', 'a/c', 'b/a', 'b/c'])
      nm(fixtures, '!a/*', ['b/a', 'b/b', 'b/c'])
      nm(fixtures, '!a/b', ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
      nm(fixtures, '!a/(b)', ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
      nm(fixtures, '!a/(*)', ['b/a', 'b/b', 'b/c'])
      nm(fixtures, '!(*/b)', ['a/a', 'a/c', 'b/a', 'b/c'])
      nm(fixtures, '!(a/b)', ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
    })
  })

  describe('windows paths', function () {
    var sep = path.sep
    beforeEach(function () {
      path.sep = '\\'
    })

    afterEach(function () {
      path.sep = sep
    })

    it('should return an array of matches for a literal string', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c', 'b\\a', 'b\\b', 'b\\c']
      nm(fixtures, '(a/b)', ['a\\b'], { unixify: false })
      nm(fixtures, '(a/b)', ['a/b'])
      nm(fixtures, 'a/b', ['a\\b'], { unixify: false })
      nm(fixtures, 'a/b', ['a/b'])
    })

    it('should support regex logical or', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c']
      nm(fixtures, 'a/(a|c)', ['a\\a', 'a\\c'], { unixify: false })
      nm(fixtures, 'a/(a|c)', ['a/a', 'a/c'])
      nm(fixtures, 'a/(a|b|c)', ['a\\a', 'a\\b', 'a\\c'], { unixify: false })
      nm(fixtures, 'a/(a|b|c)', ['a/a', 'a/b', 'a/c'])
    })

    it('should support regex ranges', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c', 'a\\x\\y', 'a\\x']
      nm(fixtures, 'a/[b-c]', ['a\\b', 'a\\c'], { unixify: false })
      nm(fixtures, 'a/[b-c]', ['a/b', 'a/c'])
      nm(fixtures, 'a/[a-z]', ['a\\a', 'a\\b', 'a\\c', 'a\\x'], { unixify: false })
      nm(fixtures, 'a/[a-z]', ['a/a', 'a/b', 'a/c', 'a/x'])
    })

    it('should support negation patterns', function () {
      var fixtures = ['a\\a', 'a\\b', 'a\\c', 'b\\a', 'b\\b', 'b\\c']
      nm(fixtures, '!*/*', [])
      nm(fixtures, '!*/b', ['a\\a', 'a\\c', 'b\\a', 'b\\c'], { unixify: false })
      nm(fixtures, '!*/b', ['a/a', 'a/c', 'b/a', 'b/c'])
      nm(fixtures, '!a/*', ['b\\a', 'b\\b', 'b\\c'], { unixify: false })
      nm(fixtures, '!a/*', ['b/a', 'b/b', 'b/c'])
      nm(fixtures, '!a/b', ['a\\a', 'a\\c', 'b\\a', 'b\\b', 'b\\c'], { unixify: false })
      nm(fixtures, '!a/b', ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
      nm(fixtures, '!a/(b)', ['a\\a', 'a\\c', 'b\\a', 'b\\b', 'b\\c'], { unixify: false })
      nm(fixtures, '!a/(b)', ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
      nm(fixtures, '!a/(*)', ['b\\a', 'b\\b', 'b\\c'], { unixify: false })
      nm(fixtures, '!a/(*)', ['b/a', 'b/b', 'b/c'])
      nm(fixtures, '!(*/b)', ['a\\a', 'a\\c', 'b\\a', 'b\\c'], { unixify: false })
      nm(fixtures, '!(*/b)', ['a/a', 'a/c', 'b/a', 'b/c'])
      nm(fixtures, '!(a/b)', ['a\\a', 'a\\c', 'b\\a', 'b\\b', 'b\\c'], { unixify: false })
      nm(fixtures, '!(a/b)', ['a/a', 'a/c', 'b/a', 'b/b', 'b/c'])
    })
  })
})

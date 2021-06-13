'use strict'

var assert = require('assert')
var nm = require('./support/match')

describe('dotfiles', function () {
  describe('file name matching', function () {
    it('should not match a dot when the dot is not explicitly defined', function () {
      assert(!nm.isMatch('.dot', '*dot'))
      assert(!nm.isMatch('a/.dot', 'a/*dot'))
    })

    it('should not match leading dots with question marks', function () {
      assert(!nm.isMatch('.dot', '?dot'))
      assert(!nm.isMatch('/.dot', '/?dot'))
      assert(!nm.isMatch('a/.dot', 'a/?dot'))
    })

    it('should match with double dots', function () {
      var fixtures = ['a/../a', 'ab/../ac', '../a', 'a', '../../b', '../c', '../c/d']
      nm(fixtures, '../*', ['../a', '../c'])
      nm(fixtures, '*/../*', ['a/../a', 'ab/../ac'])
      nm(fixtures, '**/../*', ['a/../a', 'ab/../ac', '../a', '../c'])
    })

    it('should not match a dot when the dot is not explicitly defined', function () {
      var fixtures = [
        'a/b/.x',
        '.x',
        '.x/',
        '.x/a',
        '.x/a/b',
        '.x/.x',
        'a/.x',
        'a/b/.x/c',
        'a/b/.x/c/d',
        'a/b/.x/c/d/e',
        'a/b/.x/',
        'a/.x/b',
        'a/.x/b/.x/c',
      ]
      nm(fixtures, '**/.x/**', ['.x/', '.x/a', '.x/a/b', 'a/b/.x/c', 'a/b/.x/c/d', 'a/b/.x/c/d/e', 'a/b/.x/', 'a/.x/b'])
    })

    it('should match a dot when the dot is explicitly defined', function () {
      // first one is from minimatch tests
      var fixtures = [
        'a/b/.x/c',
        'a/b/.x/c/d',
        'a/b/.x/c/d/e',
        'a/b/.x',
        'a/b/.x/',
        'a/.x/b',
        '.x',
        '.x/',
        '.x/a',
        '.x/a/b',
        'a/.x/b/.x/c',
        '.x/.x',
      ]
      var expected = ['.x/', '.x/a', '.x/a/b', 'a/.x/b', 'a/b/.x/', 'a/b/.x/c', 'a/b/.x/c/d', 'a/b/.x/c/d/e']

      nm(fixtures, '**/.x/**', expected)
      nm('/.dot', '/[.]dot', ['/.dot'])
      nm('.dot', '[.]dot', ['.dot'])
      nm('.dot', '.[d]ot', ['.dot'])
      nm('.dot', '.dot*', ['.dot'])
      nm('.dot', '.d?t', ['.dot'])

      assert(!nm.isMatch('.bar.baz', '.*.*/'))
      assert(!nm.isMatch('/.dot', '*/[.]dot'))
      assert(nm.isMatch('/.dot', '**/.[d]ot'))
      assert(nm.isMatch('/.dot', '**/.dot*'))
      assert(nm.isMatch('/.dot', '**/[.]dot'))
      assert(nm.isMatch('.bar.baz/', '.*.*'))
      assert(nm.isMatch('.bar.baz', '.*.*'))
      assert(nm.isMatch('.bar.baz', '.*.baz'))
      assert(nm.isMatch('.bar.baz/', '.*.*/'))
      assert(nm.isMatch('.dot', '.*ot'))
      assert(nm.isMatch('.dot', '.[d]ot'))
      assert(nm.isMatch('.dot.foo.bar', '.*ot.*.*'))
      assert(nm.isMatch('.dotfile.js', '.*.js'))
      assert(nm.isMatch('/.dot', '/.[d]ot'))
      assert(nm.isMatch('/.dot', '/.dot*'))
      assert(nm.isMatch('/.dot', '/[.]dot'))
      assert(nm.isMatch('a/.dot', '**/.[d]ot'))
      assert(nm.isMatch('a/.dot', '*/.[d]ot'))
      assert(nm.isMatch('a/.dot', '*/.dot*'))
      assert(nm.isMatch('a/.dot', '*/[.]dot'))
      assert(nm.isMatch('a/b/.dot', '**/.[d]ot'))
      assert(nm.isMatch('a/b/.dot', '**/.dot*'))
      assert(nm.isMatch('a/b/.dot', '**/[.]dot'))
      assert(nm.isMatch('a/b/.dot', '.dot', { matchBase: true }))
      assert(nm.isMatch('a/b/.dot', '[.]dot', { matchBase: true }))
    })
  })

  describe('multiple directories', function () {
    it('should not match a dot when the dot is not explicitly defined', function () {
      assert(!nm.isMatch('.dot', '**/*dot'))
      assert(!nm.isMatch('.dot', '**/?dot'))
      assert(!nm.isMatch('.dot', '*/*dot'))
      assert(!nm.isMatch('.dot', '*/?dot'))
      assert(!nm.isMatch('.dot', '/*dot'))
      assert(!nm.isMatch('.dot', '/?dot'))
      assert(!nm.isMatch('/.dot', '**/*dot'))
      assert(!nm.isMatch('/.dot', '**/?dot'))
      assert(!nm.isMatch('/.dot', '*/*dot'))
      assert(!nm.isMatch('/.dot', '*/?dot'))
      assert(!nm.isMatch('/.dot', '/*dot'))
      assert(!nm.isMatch('/.dot', '/?dot'))
      assert(!nm.isMatch('a/.dot', '*/*dot'))
      assert(!nm.isMatch('a/.dot', '*/?dot'))
      assert(!nm.isMatch('a/b/.dot', '**/*dot'))
      assert(!nm.isMatch('a/b/.dot', '**/?dot'))

      // related https://github.com/jonschlinkert/micromatch/issues/63
      assert(!nm.isMatch('/aaa/bbb/.git', '/aaa/bbb/**'))
      assert(!nm.isMatch('aaa/bbb/.git', 'aaa/bbb/**'))
      assert(!nm.isMatch('/aaa/bbb/ccc/.git', '/aaa/bbb/**'))
    })
  })

  describe('options.dot', function () {
    it('should match dotfiles when `options.dot` is true', function () {
      assert(nm.isMatch('/a/b/.dot', '**/*dot', { dot: true }))
      assert(nm.isMatch('/a/b/.dot', '**/.[d]ot', { dot: true }))
      assert(nm.isMatch('/a/b/.dot', '**/?dot', { dot: true }))
      assert(nm.isMatch('/a/b/.dot', '**/[.]dot', { dot: false }))
      assert(nm.isMatch('/a/b/.dot', '**/[.]dot', { dot: true }))
      assert(nm.isMatch('.dotfile.js', '.*.js', { dot: true }))
      assert(nm.isMatch('.dot', '*dot', { dot: true }))
      assert(nm.isMatch('.dot', '?dot', { dot: true }))
      assert(nm.isMatch('.dot', '[.]dot', { dot: true }))
      assert(nm.isMatch('/a/b/.dot', '/**/*dot', { dot: true }))
      assert(nm.isMatch('/a/b/.dot', '/**/.[d]ot', { dot: true }))
      assert(nm.isMatch('/a/b/.dot', '/**/?dot', { dot: true }))
      assert(nm.isMatch('/a/b/.dot', '/**/[.]dot', { dot: false }))
      assert(nm.isMatch('/a/b/.dot', '/**/[.]dot', { dot: true }))
      assert(nm.isMatch('a/b/.dot', '**/*dot', { dot: true }))
      assert(nm.isMatch('a/b/.dot', '**/.[d]ot', { dot: true }))
      assert(nm.isMatch('a/b/.dot', '**/?dot', { dot: true }))
      assert(nm.isMatch('a/b/.dot', '**/[.]dot', { dot: false }))
      assert(nm.isMatch('a/b/.dot', '**/[.]dot', { dot: true }))
    })

    it('should match dotfiles when `.dot` and `.matchBase` both defined', function () {
      assert(nm.isMatch('a/b/.dot', '*dot', { dot: true, matchBase: true }))
      assert(nm.isMatch('a/b/.dot', '[.]dot', { dot: true, matchBase: true }))
      assert(nm.isMatch('a/b/.dot', '[.]dot', { dot: false, matchBase: true }))
      assert(nm.isMatch('a/b/.dot', '?dot', { dot: true, matchBase: true }))
    })

    it('should not match dotfiles when `options.dot` is false', function () {
      assert(!nm.isMatch('a/b/.dot', '**/*dot', { dot: false }))
      assert(!nm.isMatch('a/b/.dot', '**/?dot', { dot: false }))
    })

    it('should not match dotfiles when `.dot` is false and `.matchBase` is true', function () {
      assert(!nm.isMatch('a/b/.dot', '*dot', { dot: false, matchBase: true }))
      assert(!nm.isMatch('a/b/.dot', '?dot', { dot: false, matchBase: true }))
    })

    it('should not match dotfiles when `.dot` is not defined and a dot is not in the glob pattern', function () {
      assert(!nm.isMatch('a/b/.dot', '*dot', { matchBase: true }))
      assert(!nm.isMatch('a/b/.dot', '?dot', { matchBase: true }))
      assert(!nm.isMatch('a/b/.dot', '**/*dot'))
      assert(!nm.isMatch('a/b/.dot', '**/?dot'))
    })
  })
})

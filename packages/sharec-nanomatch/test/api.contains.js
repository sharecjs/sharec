'use strict'

var path = require('path')
var sep = path.sep
var assert = require('assert')
var nm = require('..')

describe('.contains()', function () {
  describe('patterns', function () {
    it('should correctly deal with empty patterns', function () {
      assert(!nm.contains('ab', ''))
      assert(!nm.contains('a', ''))
      assert(!nm.contains('.', ''))
    })

    it('should return true when the path contains the pattern', function () {
      assert(nm.contains('ab', 'b'))
      assert(nm.contains('.', '.'))
      assert(nm.contains('a/b/c', 'a/b'))
      assert(nm.contains('/ab', '/a'))
      assert(nm.contains('a', 'a'))
      assert(nm.contains('ab', 'a'))
      assert(nm.contains('ab', 'ab'))
      assert(nm.contains('abcd', 'd'))
      assert(nm.contains('abcd', 'c'))
      assert(nm.contains('abcd', 'cd'))
      assert(nm.contains('abcd', 'bc'))
      assert(nm.contains('abcd', 'ab'))
    })

    it('should match with conmon glob patterns', function () {
      assert(nm.contains('a/b/c', 'a/*'))
      assert(nm.contains('/ab', '/a'))
      assert(nm.contains('/ab', '/*'))
      assert(nm.contains('/cd', '/*'))
      assert(nm.contains('ab', '*'))
      assert(nm.contains('ab', 'ab'))
      assert(nm.contains('/ab', '*/a'))
      assert(nm.contains('/ab', '*/'))
      assert(nm.contains('/ab', '*/*'))
      assert(nm.contains('/ab', '/'))
      assert(nm.contains('/ab', '/??'))
      assert(nm.contains('/ab', '/?b'))
      assert(nm.contains('/ab', '/?'))
      assert(nm.contains('a/b', '?/?'))
    })

    it('should return false when the path does not contain the pattern', function () {
      assert(!nm.contains('/ab', '?/?'))
      assert(!nm.contains('ab', '*/*'))
      assert(!nm.contains('abcd', 'f'))
      assert(!nm.contains('ab', 'c'))
      assert(!nm.contains('ab', '/a'))
      assert(!nm.contains('/ab', 'a/*'))
      assert(!nm.contains('ef', '/*'))
    })

    it('should match files that contain the given extension:', function () {
      assert(nm.contains('ab', './*'))
      assert(nm.contains('.c.md', '*.md'))
      assert(nm.contains('.c.md', '.*.md'))
      assert(nm.contains('.c.md', '.c.'))
      assert(nm.contains('.c.md', '.md'))
      assert(nm.contains('.md', '.m'))
      assert(nm.contains('a/b/c.md', '**/*.md'))
      assert(nm.contains('a/b/c.md', '*.md'))
      assert(nm.contains('a/b/c.md', '.md'))
      assert(nm.contains('a/b/c.md', 'a/*/*.md'))
      assert(nm.contains('a/b/c/c.md', '*.md'))
      assert(nm.contains('c.md', '*.md'))
    })

    it('should not match files that do not contain the given extension:', function () {
      assert(!nm.contains('.md', '*.md'))
      assert(!nm.contains('a/b/c/c.md', 'c.js'))
      assert(!nm.contains('a/b/c.md', 'a/*.md'))
    })

    it('should match dotfiles when a dot is explicitly defined in the pattern:', function () {
      assert(nm.contains('.a', '.a'))
      assert(nm.contains('.ab', '.*'))
      assert(nm.contains('.ab', '.a*'))
      assert(nm.contains('.abc', '.a'))
      assert(nm.contains('.b', '.b*'))
      assert(nm.contains('.c.md', '*.md'))
      assert(nm.contains('.md', '.md'))
      assert(nm.contains('a/.c.md', '*.md'))
      assert(nm.contains('a/.c.md', 'a/.c.md'))
      assert(nm.contains('a/b/c/.xyz.md', 'a/b/c/.*.md'))
      assert(nm.contains('a/b/c/d.a.md', 'a/b/c/*.md'))
    })

    it('should match dotfiles when `dot` or `dotfiles` is set:', function () {
      assert(nm.contains('.c.md', '*.md', { dot: true }))
      assert(nm.contains('.c.md', '.*', { dot: true }))
      assert(nm.contains('a/b/c/.xyz.md', '**/*.md', { dot: true }))
      assert(nm.contains('a/b/c/.xyz.md', '**/.*.md', { dot: true }))
      assert(nm.contains('a/b/c/.xyz.md', '.*.md', { dot: true }))
      assert(nm.contains('a/b/c/.xyz.md', 'a/b/c/*.md', { dot: true }))
      assert(nm.contains('a/b/c/.xyz.md', 'a/b/c/.*.md', { dot: true }))
    })

    it('should not match dotfiles when `dot` or `dotfiles` is not set:', function () {
      assert(!nm.contains('.a', '*.md'))
      assert(!nm.contains('.ba', '.a'))
      assert(!nm.contains('.a.md', 'a/b/c/*.md'))
      assert(!nm.contains('.ab', '*.*'))
      assert(!nm.contains('.md', 'a/b/c/*.md'))
      assert(!nm.contains('.txt', '.md'))
      assert(!nm.contains('.verb.txt', '*.md'))
      assert(!nm.contains('a/b/d/.md', 'a/b/c/*.md'))
    })

    it('should match file paths:', function () {
      assert(nm.contains('a/b/c/xyz.md', 'a/b/c/*.md'))
      assert(nm.contains('a/bb/c/xyz.md', 'a/*/c/*.md'))
      assert(nm.contains('a/bbbb/c/xyz.md', 'a/*/c/*.md'))
      assert(nm.contains('a/bb.bb/c/xyz.md', 'a/*/c/*.md'))
      assert(nm.contains('a/bb.bb/aa/bb/aa/c/xyz.md', 'a/**/c/*.md'))
      assert(nm.contains('a/bb.bb/aa/b.b/aa/c/xyz.md', 'a/**/c/*.md'))
    })

    it('should return true when full file paths are matched:', function () {
      assert(nm.contains('a/.b', 'a/.*'))
      assert(nm.contains('a/.b', 'a/'))
      assert(nm.contains('a/b/z/.a', 'b/z'))
      assert(nm.contains('a/b/z/.a', 'a/*/z/.a'))
      assert(nm.contains('a/b/c/d/e/z/c.md', 'a/**/z/*.md'))
      assert(nm.contains('a/b/c/d/e/z/c.md', 'b/c/d/e'))
      assert(nm.contains('a/b/c/d/e/j/n/p/o/z/c.md', 'a/**/j/**/z/*.md'))
    })

    it('should match path segments:', function () {
      assert(nm.contains('aaa', 'aaa'))
      assert(nm.contains('aaa', 'aa'))
      assert(nm.contains('aaa/bbb', 'aaa/bbb'))
      assert(nm.contains('aaa/bbb', 'aaa/*'))
      assert(nm.contains('aaa/bba/ccc', '**/*/ccc'))
      assert(nm.contains('aaa/bba/ccc', '*/*a'))
      assert(nm.contains('aaa/bba/ccc', 'aaa*'))
      assert(nm.contains('aaa/bba/ccc', 'aaa**'))
      assert(nm.contains('aaa/bba/ccc', 'aaa/*'))
      assert(nm.contains('aaa/bba/ccc', 'aaa/**'))
      assert(nm.contains('aaa/bba/ccc', 'aaa/*/ccc'))
      assert(nm.contains('aaa/bba/ccc', 'bb'))
      assert(nm.contains('aaa/bba/ccc', 'bb*'))
      assert(!nm.contains('aaa/bba/ccc', 'aaa/*ccc'))
      assert(!nm.contains('aaa/bba/ccc', 'aaa/**ccc'))
      assert(!nm.contains('aaa/bba/ccc', 'aaa/*z'))
      assert(!nm.contains('aaa/bba/ccc', 'aaa/**z'))
      assert(nm.contains('aaa/bbb', 'aaa[/]bbb'))
      assert(!nm.contains('aaa', '*/*/*'))
      assert(!nm.contains('aaa/bbb', '*/*/*'))
      assert(nm.contains('aaa/bba/ccc', '*/*/*'))
      assert(nm.contains('aaa/bb/aa/rr', '*/*/*'))
      assert(nm.contains('abzzzejklhi', '*j*i'))
      assert(nm.contains('ab/zzz/ejkl/hi', '*/*z*/*/*i'))
      assert(nm.contains('ab/zzz/ejkl/hi', '*/*jk*/*i'))
    })

    it('should return false when full file paths are not matched:', function () {
      assert(!nm.contains('a/b/z/.a', 'b/a'))
      assert(!nm.contains('a/.b', 'a/**/z/*.md'))
      assert(!nm.contains('a/b/z/.a', 'a/**/z/*.a'))
      assert(!nm.contains('a/b/z/.a', 'a/*/z/*.a'))
      assert(!nm.contains('a/b/c/j/e/z/c.txt', 'a/**/j/**/z/*.md'))
    })

    it('should match paths with leading `./`:', function () {
      assert(!nm.contains('./.a', 'a/**/z/*.md'))
      assert(nm.contains('./a/b/z/.a', 'a/**/z/.a'))
      assert(nm.contains('./a/b/z/.a', './a/**/z/.a'))
      assert(nm.contains('./a/b/c/d/e/z/c.md', 'a/**/z/*.md'))
      assert(nm.contains('./a/b/c/d/e/z/c.md', './a/**/z/*.md'))
      assert(!nm.contains('./a/b/c/d/e/z/c.md', './a/**/j/**/z/*.md'))
      assert(nm.contains('./a/b/c/j/e/z/c.md', './a/**/j/**/z/*.md'))
      assert(nm.contains('./a/b/c/j/e/z/c.md', 'a/**/j/**/z/*.md'))
      assert(nm.contains('./a/b/c/d/e/j/n/p/o/z/c.md', './a/**/j/**/z/*.md'))
      assert(!nm.contains('./a/b/c/j/e/z/c.txt', './a/**/j/**/z/*.md'))
    })
  })

  describe('windows paths', function () {
    beforeEach(function () {
      path.sep = '\\'
    })
    afterEach(function () {
      path.sep = sep
    })

    it('should match with conmon glob patterns', function () {
      assert(nm.contains('a\\b\\c', 'a/*'))
      assert(nm.contains('\\ab', '/a'))
      assert(nm.contains('\\ab', '/*'))
      assert(nm.contains('\\cd', '/*'))
      assert(nm.contains('\\ab', '*/a'))
      assert(nm.contains('\\ab', '*/'))
      assert(nm.contains('\\ab', '*/*'))
      assert(nm.contains('\\ab', '/'))
      assert(nm.contains('\\ab', '/??'))
      assert(nm.contains('\\ab', '/?b'))
      assert(nm.contains('\\ab', '/?'))
      assert(nm.contains('a\\b', '?/?'))
    })

    it('should match files that contain the given extension:', function () {
      assert(nm.contains('a\\b\\c.md', '**/*.md'))
      assert(nm.contains('a\\b\\c.md', '*.md'))
      assert(nm.contains('a\\b\\c.md', '.md'))
      assert(nm.contains('a\\b\\c.md', 'a/*/*.md'))
      assert(nm.contains('a\\b\\c\\c.md', '*.md'))
    })

    it('should match dotfiles when `dot` or `dotfiles` is set:', function () {
      assert(nm.contains('a\\b\\c\\.xyz.md', '.*.md', { unixify: true, dot: true }))
      assert(nm.contains('a\\b\\c\\.xyz.md', '**/*.md', { unixify: true, dot: true }))
      assert(nm.contains('a\\b\\c\\.xyz.md', '**/.*.md', { unixify: true, dot: true }))
      assert(nm.contains('a\\b\\c\\.xyz.md', 'a/b/c/*.md', { unixify: true, dot: true }))
      assert(nm.contains('a\\b\\c\\.xyz.md', 'a/b/c/.*.md', { unixify: true, dot: true }))
    })

    it('should not match dotfiles when `dot` or `dotfiles` is not set:', function () {
      assert(!nm.contains('a\\b\\d\\.md', 'a/b/c/*.md'))
    })

    it('should match file paths:', function () {
      assert(nm.contains('a\\b\\c\\xyz.md', 'a/b/c/*.md'))
      assert(nm.contains('a\\bb\\c\\xyz.md', 'a/*/c/*.md'))
      assert(nm.contains('a\\bbbb\\c\\xyz.md', 'a/*/c/*.md'))
      assert(nm.contains('a\\bb.bb\\c\\xyz.md', 'a/*/c/*.md'))
      assert(nm.contains('a\\bb.bb\\aa\\bb\\aa\\c\\xyz.md', 'a/**/c/*.md'))
      assert(nm.contains('a\\bb.bb\\aa\\b.b\\aa\\c\\xyz.md', 'a/**/c/*.md'))
    })

    it('should return true when full file paths are matched:', function () {
      assert(nm.contains('a\\.b', 'a/.*'))
      assert(nm.contains('a\\.b', 'a/'))
      assert(nm.contains('a\\b\\z\\.a', 'b/z'))
      assert(nm.contains('a\\b\\z\\.a', 'a/*/z/.a'))
      assert(nm.contains('a\\b\\c\\d\\e\\z\\c.md', 'a/**/z/*.md'))
      assert(nm.contains('a\\b\\c\\d\\e\\z\\c.md', 'b/c/d/e'))
      assert(nm.contains('a\\b\\c\\d\\e\\j\\n\\p\\o\\z\\c.md', 'a/**/j/**/z/*.md'))
    })

    it('should match path segments:', function () {
      assert(nm.contains('aaa\\bbb', 'aaa/bbb'))
      assert(nm.contains('aaa\\bbb', 'aaa/*'))
      assert(nm.contains('aaa\\bba\\ccc', '**/*/ccc'))
      assert(nm.contains('aaa\\bba\\ccc', '*/*a'))
      assert(nm.contains('aaa\\bba\\ccc', 'aaa*'))
      assert(nm.contains('aaa\\bba\\ccc', 'aaa**'))
      assert(nm.contains('aaa\\bba\\ccc', 'aaa/*'))
      assert(nm.contains('aaa\\bba\\ccc', 'aaa/**'))
      assert(nm.contains('aaa\\bba\\ccc', 'aaa/*/ccc'))
      assert(nm.contains('aaa\\bba\\ccc', 'bb'))
      assert(nm.contains('aaa\\bba\\ccc', 'bb*'))
      assert(nm.contains('aaa\\bbb', 'aaa[/]bbb'))
      assert(nm.contains('aaa\\bbb', 'aaa[\\\\/]bbb'))
      assert(!nm.contains('aaa\\bba\\ccc', 'aaa/*ccc'))
      assert(!nm.contains('aaa\\bba\\ccc', 'aaa/**ccc'))
      assert(!nm.contains('aaa\\bba\\ccc', 'aaa/*z'))
      assert(!nm.contains('aaa\\bba\\ccc', 'aaa/**z'))
      assert(!nm.contains('\\aaa', '*/*/*'))
      assert(!nm.contains('aaa\\bbb', '*/*/*'))
      assert(nm.contains('aaa\\bba\\ccc', '*/*/*'))
      assert(nm.contains('aaa\\bb\\aa\\rr', '*/*/*'))
      assert(nm.contains('ab\\zzz\\ejkl\\hi', '*/*z*/*/*i'))
      assert(nm.contains('ab\\zzz\\ejkl\\hi', '*/*jk*/*i'))
    })

    it('should return false when full file paths are not matched:', function () {
      assert(!nm.contains('a\\b\\z\\.a', 'b/a'))
      assert(!nm.contains('a\\.b', 'a/**/z/*.md'))
      assert(!nm.contains('a\\b\\z\\.a', 'a/**/z/*.a'))
      assert(!nm.contains('a\\b\\z\\.a', 'a/*/z/*.a'))
      assert(!nm.contains('a\\b\\c\\j\\e\\z\\c.txt', 'a/**/j/**/z/*.md'))
    })

    it('should match dotfiles when a dot is explicitly defined in the pattern:', function () {
      assert(nm.contains('a\\.c.md', 'a/.c.md'))
      assert(nm.contains('a\\b\\c\\.xyz.md', 'a/b/c/.*.md'))
      assert(nm.contains('a\\.c.md', '*.md'))
      assert(nm.contains('a\\b\\c\\d.a.md', 'a/b/c/*.md'))
    })

    it('should match paths with leading `./`:', function () {
      assert(!nm.contains('.\\.a', 'a/**/z/*.md'))
      assert(!nm.contains('.\\a\\b\\c\\d\\e\\z\\c.md', './a/**/j/**/z/*.md'))
      assert(nm.contains('.\\a\\b\\c\\d\\e\\j\\n\\p\\o\\z\\c.md', './a/**/j/**/z/*.md'))
      assert(nm.contains('.\\a\\b\\c\\d\\e\\z\\c.md', './a/**/z/*.md'))
      assert(nm.contains('.\\a\\b\\c\\d\\e\\z\\c.md', 'a/**/z/*.md'))
      assert(nm.contains('.\\a\\b\\c\\j\\e\\z\\c.md', './a/**/j/**/z/*.md'))
      assert(nm.contains('.\\a\\b\\c\\j\\e\\z\\c.md', 'a/**/j/**/z/*.md'))
      assert(nm.contains('.\\a\\b\\z\\.a', './a/**/z/.a'))
      assert(nm.contains('.\\a\\b\\z\\.a', 'a/**/z/.a'))
    })
  })
})

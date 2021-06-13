'use strict'

var assert = require('assert')
var nm = require('..')

describe('.isMatch():', function () {
  describe('error handling:', function () {
    it('should throw on bad args', function () {
      assert.throws(function () {
        nm.isMatch({})
      })
    })
  })

  describe('matching:', function () {
    it('should escape plus signs to match string literals', function () {
      assert(nm.isMatch('a+b/src/glimini.js', 'a+b/src/*.js'))
      assert(nm.isMatch('+b/src/glimini.js', '+b/src/*.js'))
      assert(nm.isMatch('coffee+/src/glimini.js', 'coffee+/src/*.js'))
      assert(nm.isMatch('coffee+/src/glimini.js', 'coffee+/src/*.js'))
      assert(nm.isMatch('coffee+/src/glimini.js', 'coffee+/src/*'))
    })

    it('should not escape plus signs that follow brackets', function () {
      assert(nm.isMatch('a', '[a]+'))
      assert(nm.isMatch('aa', '[a]+'))
      assert(nm.isMatch('aaa', '[a]+'))
      assert(nm.isMatch('az', '[a-z]+'))
      assert(nm.isMatch('zzz', '[a-z]+'))
    })

    it('should support stars following brackets', function () {
      assert(nm.isMatch('a', '[a]*'))
      assert(nm.isMatch('aa', '[a]*'))
      assert(nm.isMatch('aaa', '[a]*'))
      assert(nm.isMatch('az', '[a-z]*'))
      assert(nm.isMatch('zzz', '[a-z]*'))
    })

    it('should not escape plus signs that follow parens', function () {
      assert(nm.isMatch('a', '(a)+'))
      assert(nm.isMatch('ab', '(a|b)+'))
      assert(nm.isMatch('aa', '(a)+'))
      assert(nm.isMatch('aaab', '(a|b)+'))
      assert(nm.isMatch('aaabbb', '(a|b)+'))
    })

    it('should support stars following parens', function () {
      assert(nm.isMatch('a', '(a)*'))
      assert(nm.isMatch('ab', '(a|b)*'))
      assert(nm.isMatch('aa', '(a)*'))
      assert(nm.isMatch('aaab', '(a|b)*'))
      assert(nm.isMatch('aaabbb', '(a|b)*'))
    })

    it('should not match slashes with single stars', function () {
      assert(!nm.isMatch('a/b', '(a)*'))
      assert(!nm.isMatch('a/b', '[a]*'))
      assert(!nm.isMatch('a/b', 'a*'))
      assert(!nm.isMatch('a/b', '(a|b)*'))
    })

    it('should not match dots with stars by default', function () {
      assert(!nm.isMatch('.a', '(a)*'))
      assert(!nm.isMatch('.a', '*[a]*'))
      assert(!nm.isMatch('.a', '*[a]'))
      assert(!nm.isMatch('.a', '*a*'))
      assert(!nm.isMatch('.a', '*a'))
      assert(!nm.isMatch('.a', '*(a|b)'))
    })

    it('should correctly deal with empty globs', function () {
      assert(!nm.isMatch('ab', ''))
      assert(!nm.isMatch('a', ''))
      assert(!nm.isMatch('.', ''))
    })

    it('should match with non-glob patterns', function () {
      assert(nm.isMatch('.', '.'))
      assert(nm.isMatch('/a', '/a'))
      assert(!nm.isMatch('/ab', '/a'))
      assert(nm.isMatch('a', 'a'))
      assert(!nm.isMatch('ab', '/a'))
      assert(!nm.isMatch('ab', 'a'))
      assert(nm.isMatch('ab', 'ab'))
      assert(!nm.isMatch('abcd', 'cd'))
      assert(!nm.isMatch('abcd', 'bc'))
      assert(!nm.isMatch('abcd', 'ab'))
    })

    it('should match file names', function () {
      assert(nm.isMatch('a.b', 'a.b'))
      assert(nm.isMatch('a.b', '*.b'))
      assert(nm.isMatch('a.b', 'a.*'))
      assert(nm.isMatch('a.b', '*.*'))
      assert(nm.isMatch('a-b.c-d', 'a*.c*'))
      assert(nm.isMatch('a-b.c-d', '*b.*d'))
      assert(nm.isMatch('a-b.c-d', '*.*'))
      assert(nm.isMatch('a-b.c-d', '*.*-*'))
      assert(nm.isMatch('a-b.c-d', '*-*.*-*'))
      assert(nm.isMatch('a-b.c-d', '*.c-*'))
      assert(nm.isMatch('a-b.c-d', '*.*-d'))
      assert(nm.isMatch('a-b.c-d', 'a-*.*-d'))
      assert(nm.isMatch('a-b.c-d', '*-b.c-*'))
      assert(nm.isMatch('a-b.c-d', '*-b*c-*'))

      // false
      assert(!nm.isMatch('a-b.c-d', '*-bc-*'))
    })

    it('should match with conmon glob patterns', function () {
      assert(nm.isMatch('/ab', '/*'))
      assert(nm.isMatch('/cd', '/*'))
      assert(!nm.isMatch('ef', '/*'))
      assert(nm.isMatch('ab', './*'))
      assert(nm.isMatch('ab/', './*/'))
      assert(!nm.isMatch('ab', './*/'))
      assert(nm.isMatch('ab', '*'))
      assert(nm.isMatch('ab', 'ab'))
    })

    it('should exactly match leading slash', function () {
      assert(!nm.isMatch('ef', '/*'))
      assert(nm.isMatch('/ef', '/*'))
    })

    it('should match files with the given extension', function () {
      assert(!nm.isMatch('.md', '*.md'))
      assert(nm.isMatch('.md', '.md'))
      assert(!nm.isMatch('.c.md', '*.md'))
      assert(nm.isMatch('.c.md', '.*.md'))
      assert(nm.isMatch('c.md', '*.md'))
      assert(nm.isMatch('c.md', '*.md'))
      assert(!nm.isMatch('a/b/c/c.md', '*.md'))
      assert(!nm.isMatch('a/b/c.md', 'a/*.md'))
      assert(nm.isMatch('a/b/c.md', 'a/*/*.md'))
      assert(nm.isMatch('a/b/c.md', '**/*.md'))
      assert(nm.isMatch('a/b/c.js', 'a/**/*.*'))
    })

    it('should match wildcards', function () {
      assert(!nm.isMatch('a/b/c/z.js', '*.js'))
      assert(!nm.isMatch('a/b/z.js', '*.js'))
      assert(!nm.isMatch('a/z.js', '*.js'))
      assert(nm.isMatch('z.js', '*.js'))

      assert(nm.isMatch('z.js', 'z*.js'))
      assert(nm.isMatch('a/z.js', 'a/z*.js'))
      assert(nm.isMatch('a/z.js', '*/z*.js'))
    })

    it('should match globstars', function () {
      assert(nm.isMatch('a/b/c/z.js', '**/*.js'))
      assert(nm.isMatch('a/b/z.js', '**/*.js'))
      assert(nm.isMatch('a/z.js', '**/*.js'))
      assert(nm.isMatch('a/b/c/d/e/z.js', 'a/b/**/*.js'))
      assert(nm.isMatch('a/b/c/d/z.js', 'a/b/**/*.js'))
      assert(nm.isMatch('a/b/c/z.js', 'a/b/c/**/*.js'))
      assert(nm.isMatch('a/b/c/z.js', 'a/b/c**/*.js'))
      assert(nm.isMatch('a/b/c/z.js', 'a/b/**/*.js'))
      assert(nm.isMatch('a/b/z.js', 'a/b/**/*.js'))

      assert(!nm.isMatch('a/z.js', 'a/b/**/*.js'))
      assert(!nm.isMatch('z.js', 'a/b/**/*.js'))

      // issue #23
      assert(!nm.isMatch('zzjs', 'z*.js'))
      assert(!nm.isMatch('zzjs', '*z.js'))

      // issue #24
      assert(nm.isMatch('a', '**'))
      assert(!nm.isMatch('a', 'a/**'))
      assert(nm.isMatch('a/', '**'))
      assert(nm.isMatch('a/b/c/d', '**'))
      assert(nm.isMatch('a/b/c/d/', '**'))
      assert(nm.isMatch('a/b/c/d/', '**/**'))
      assert(nm.isMatch('a/b/c/d/', '**/b/**'))
      assert(nm.isMatch('a/b/c/d/', 'a/b/**'))
      assert(nm.isMatch('a/b/c/d/', 'a/b/**/'))
      assert(nm.isMatch('a/b/c/d/', 'a/b/**/c/**/'))
      assert(nm.isMatch('a/b/c/d/', 'a/b/**/c/**/d/'))
      assert(!nm.isMatch('a/b/c/d/', 'a/b/**/f'))
      assert(nm.isMatch('a/b/c/d/e.f', 'a/b/**/**/*.*'))
      assert(nm.isMatch('a/b/c/d/e.f', 'a/b/**/*.*'))
      assert(nm.isMatch('a/b/c/d/e.f', 'a/b/**/c/**/d/*.*'))
      assert(nm.isMatch('a/b/c/d/e.f', 'a/b/**/d/**/*.*'))
      assert(nm.isMatch('a/b/c/d/g/e.f', 'a/b/**/d/**/*.*'))
      assert(nm.isMatch('a/b/c/d/g/g/e.f', 'a/b/**/d/**/*.*'))

      // https://github.com/jonschlinkert/micromatch/issues/15
      assert(nm.isMatch('z.js', 'z*'))
      assert(nm.isMatch('z.js', '**/z*'))
      assert(nm.isMatch('z.js', '**/z*.js'))
      assert(nm.isMatch('z.js', '**/*.js'))
      assert(nm.isMatch('foo', '**/foo'))

      assert(nm.isMatch('a/b-c/z.js', 'a/b-*/**/z.js'))
      assert(nm.isMatch('a/b-c/d/e/z.js', 'a/b-*/**/z.js'))
    })

    it('should match slashes', function () {
      assert(!nm.isMatch('bar/baz/foo', '*/foo'))
      assert(!nm.isMatch('deep/foo/bar', '**/bar/*'))
      assert(!nm.isMatch('deep/foo/bar/baz/x', '*/bar/**'))
      assert(!nm.isMatch('foo', 'foo/**'))
      assert(!nm.isMatch('foo/bar', 'foo?bar'))
      assert(!nm.isMatch('foo/bar/baz', '**/bar*'))
      assert(!nm.isMatch('foo/bar/baz', '**/bar**'))
      assert(!nm.isMatch('foo/baz/bar', 'foo**bar'))
      assert(!nm.isMatch('foo/baz/bar', 'foo*bar'))
      assert(nm.isMatch('a/b/j/c/z/x.md', 'a/**/j/**/z/*.md'))
      assert(nm.isMatch('a/j/z/x.md', 'a/**/j/**/z/*.md'))
      assert(nm.isMatch('bar/baz/foo', '**/foo'))
      assert(nm.isMatch('deep/foo/bar/', '**/bar/**'))
      assert(nm.isMatch('deep/foo/bar/baz', '**/bar/*'))
      assert(nm.isMatch('deep/foo/bar/baz/', '**/bar/*'))
      assert(nm.isMatch('deep/foo/bar/baz/', '**/bar/**'))
      assert(nm.isMatch('deep/foo/bar/baz/x', '**/bar/*/*'))
      assert(nm.isMatch('foo/b/a/z/bar', 'foo/**/**/bar'))
      assert(nm.isMatch('foo/b/a/z/bar', 'foo/**/bar'))
      assert(nm.isMatch('foo/bar', 'foo/**/**/bar'))
      assert(nm.isMatch('foo/bar', 'foo/**/bar'))
      assert(nm.isMatch('foo/bar', 'foo[/]bar'))
      assert(nm.isMatch('foo/bar/baz/x', '*/bar/**'))
      assert(nm.isMatch('foo/baz/bar', 'foo/**/**/bar'))
      assert(nm.isMatch('foo/baz/bar', 'foo/**/bar'))
      assert(nm.isMatch('foobazbar', 'foo**bar'))
      assert(nm.isMatch('XXX/foo', '**/foo'))
    })

    it('question marks should not match slashes', function () {
      assert(!nm.isMatch('aaa/bbb', 'aaa?bbb'))
    })

    it('should not match dotfiles when `dot` or `dotfiles` are not set', function () {
      assert(!nm.isMatch('.c.md', '*.md'))
      assert(!nm.isMatch('a/.c.md', '*.md'))
      assert(nm.isMatch('a/.c.md', 'a/.c.md'))
      assert(!nm.isMatch('.a', '*.md'))
      assert(!nm.isMatch('.verb.txt', '*.md'))
      assert(nm.isMatch('a/b/c/.xyz.md', 'a/b/c/.*.md'))
      assert(nm.isMatch('.md', '.md'))
      assert(!nm.isMatch('.txt', '.md'))
      assert(nm.isMatch('.md', '.md'))
      assert(nm.isMatch('.a', '.a'))
      assert(nm.isMatch('.b', '.b*'))
      assert(nm.isMatch('.ab', '.a*'))
      assert(nm.isMatch('.ab', '.*'))
      assert(!nm.isMatch('.ab', '*.*'))
      assert(!nm.isMatch('.md', 'a/b/c/*.md'))
      assert(!nm.isMatch('.a.md', 'a/b/c/*.md'))
      assert(nm.isMatch('a/b/c/d.a.md', 'a/b/c/*.md'))
      assert(!nm.isMatch('a/b/d/.md', 'a/b/c/*.md'))
    })

    it('should match dotfiles when `dot` or `dotfiles` is set', function () {
      assert(nm.isMatch('.c.md', '*.md', { dot: true }))
      assert(nm.isMatch('.c.md', '.*', { dot: true }))
      assert(nm.isMatch('a/b/c/.xyz.md', 'a/b/c/*.md', { dot: true }))
      assert(nm.isMatch('a/b/c/.xyz.md', 'a/b/c/.*.md', { dot: true }))
    })

    it('should match file paths', function () {
      assert(nm.isMatch('a/b/c/xyz.md', 'a/b/c/*.md'))
      assert(nm.isMatch('a/bb/c/xyz.md', 'a/*/c/*.md'))
      assert(nm.isMatch('a/bbbb/c/xyz.md', 'a/*/c/*.md'))
      assert(nm.isMatch('a/bb.bb/c/xyz.md', 'a/*/c/*.md'))
      assert(nm.isMatch('a/bb.bb/aa/bb/aa/c/xyz.md', 'a/**/c/*.md'))
      assert(nm.isMatch('a/bb.bb/aa/b.b/aa/c/xyz.md', 'a/**/c/*.md'))
    })

    it('should match full file paths', function () {
      assert(!nm.isMatch('a/.b', 'a/**/z/*.md'))
      assert(nm.isMatch('a/.b', 'a/.*'))
      assert(!nm.isMatch('a/b/z/.a', 'a/**/z/*.a'))
      assert(!nm.isMatch('a/b/z/.a', 'a/*/z/*.a'))
      assert(nm.isMatch('a/b/z/.a', 'a/*/z/.a'))
      assert(nm.isMatch('a/b/c/d/e/z/c.md', 'a/**/z/*.md'))
      assert(nm.isMatch('a/b/c/d/e/j/n/p/o/z/c.md', 'a/**/j/**/z/*.md'))
      assert(!nm.isMatch('a/b/c/j/e/z/c.txt', 'a/**/j/**/z/*.md'))
    })

    it('should match paths with leading `./` when pattern has `./`', function () {
      assert(nm.isMatch('./a/b/c/d/e/j/n/p/o/z/c.md', './a/**/j/**/z/*.md'))
      assert(nm.isMatch('./a/b/c/d/e/z/c.md', './a/**/z/*.md'))
      assert(nm.isMatch('./a/b/c/j/e/z/c.md', './a/**/j/**/z/*.md'))
      assert(nm.isMatch('./a/b/z/.a', './a/**/z/.a'))
      // sanity checks
      assert(!nm.isMatch('./a/b/c/d/e/z/c.md', './a/**/j/**/z/*.md'))
      assert(!nm.isMatch('./a/b/c/j/e/z/c.txt', './a/**/j/**/z/*.md'))
    })

    it('should match paths with leading `./`', function () {
      assert(!nm.isMatch('./.a', '*.a'))
      assert(!nm.isMatch('./.a', './*.a'))
      assert(!nm.isMatch('./.a', 'a/**/z/*.md'))
      assert(!nm.isMatch('./a/b/c/d/e/z/c.md', './a/**/j/**/z/*.md'))
      assert(!nm.isMatch('./a/b/c/j/e/z/c.txt', './a/**/j/**/z/*.md'))
      assert(!nm.isMatch('a/b/c/d/e/z/c.md', './a/**/j/**/z/*.md'))
      assert(nm.isMatch('./.a', './.a'))
      assert(nm.isMatch('./a/b/c.md', 'a/**/*.md'))
      assert(nm.isMatch('./a/b/c/d/e/j/n/p/o/z/c.md', './a/**/j/**/z/*.md'))
      assert(nm.isMatch('./a/b/c/d/e/z/c.md', '**/*.md'))
      assert(nm.isMatch('./a/b/c/d/e/z/c.md', './a/**/z/*.md'))
      assert(nm.isMatch('./a/b/c/d/e/z/c.md', 'a/**/z/*.md'))
      assert(nm.isMatch('./a/b/c/j/e/z/c.md', './a/**/j/**/z/*.md'))
      assert(nm.isMatch('./a/b/c/j/e/z/c.md', 'a/**/j/**/z/*.md'))
      assert(nm.isMatch('./a/b/z/.a', './a/**/z/.a'))
      assert(nm.isMatch('./a/b/z/.a', 'a/**/z/.a'))
      assert(nm.isMatch('.a', './.a'))
      assert(nm.isMatch('a/b/c.md', './a/**/*.md'))
      assert(nm.isMatch('a/b/c.md', 'a/**/*.md'))
      assert(nm.isMatch('a/b/c/d/e/z/c.md', 'a/**/z/*.md'))
      assert(nm.isMatch('a/b/c/j/e/z/c.md', 'a/**/j/**/z/*.md'))
    })
  })
})

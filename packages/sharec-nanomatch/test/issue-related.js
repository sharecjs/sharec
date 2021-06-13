'use strict'

var assert = require('assert')
var nm = require('..')

describe('issue-related tests', function () {
  // https://github.com/micromatch/micromatch/issues/110
  // https://github.com/micromatch/nanomatch/issues/6
  it('issue micromatch#110', function () {
    var glob = './css/foo/**/*.css'
    assert(nm.isMatch('./css/foo/bar.css', glob))
    assert.deepEqual(nm(['./css/foo/bar.css'], glob), ['css/foo/bar.css'])

    assert(nm.isMatch('.\\css\\foo\\bar.css', glob, { unixify: true }))
    assert.deepEqual(nm(['.\\css\\foo\\bar.css'], glob, { unixify: true }), ['css/foo/bar.css'])

    assert.deepEqual(nm.match(['./foo/bar.js'], '**/*.js'), ['foo/bar.js'])
    assert.deepEqual(nm.match(['./foo/bar.js'], '**/*.js', { stripPrefix: false }), ['./foo/bar.js'])

    assert(nm.isMatch('./foo/bar.js', '**/*.js'))
    assert(nm.isMatch('foo/bar.js', '**/*.js'))
    assert(nm.isMatch('.\\foo\\bar.js', '**/*.js', { unixify: true }))
    assert(nm.isMatch('foo\\bar.js', '**/*.js', { unixify: true }))

    assert(nm.makeRe('**/*.js').test('./foo/bar.js'))
    assert(nm.makeRe('**/*.js').test('foo/bar.js'))
    assert(nm.makeRe('**/*.js').test('.\\foo\\bar.js'))
    assert(nm.makeRe('**/*.js', { unixify: true }).test('.\\foo\\bar.js'))
    assert(nm.makeRe('**/*.js', { unixify: true }).test('foo\\bar.js'))
  })

  it('issue #111', function () {
    assert(!nm.isMatch('something/file.js', '../something/*.js'))
    assert(!nm.isMatch('./something/file.js', '../something/*.js'))
    assert(nm.isMatch('./something/file.js', './something/*.js'))
    assert(nm.isMatch('./something/file.js', 'something/*.js'))
    assert(nm.isMatch('./something/file.js', '*/file.js'))
    assert(nm.isMatch('./something/file.js', './*/*.js'))
    assert(nm.isMatch('./something/file.js', '*/*.js'))

    assert(!nm.makeRe('something/*.js').test('../something/file.js'))
    assert(!nm.makeRe('./something/*.js').test('../something/file.js'))
    assert(nm.makeRe('./something/*.js').test('./something/file.js'))
    assert(nm.makeRe('something/*.js').test('./something/file.js'))
    assert(nm.makeRe('./*/file.js').test('./something/file.js'))
    assert(nm.makeRe('./*/*.js').test('./something/file.js'))
    assert(nm.makeRe('*/*.js').test('./something/file.js'))
  })

  // https://github.com/jonschlinkert/micromatch/issues/15
  it('issue #15', function () {
    assert(nm.isMatch('a/b-c/d/e/z.js', 'a/b-*/**/z.js'))
    assert(nm.isMatch('z.js', 'z*'))
    assert(nm.isMatch('z.js', '**/z*'))
    assert(nm.isMatch('z.js', '**/z*.js'))
    assert(nm.isMatch('z.js', '**/*.js'))
    assert(nm.isMatch('foo', '**/foo'))
  })

  // https://github.com/jonschlinkert/micromatch/issues/23
  it('issue #23', function () {
    assert(!nm.isMatch('zzjs', 'z*.js'))
    assert(!nm.isMatch('zzjs', '*z.js'))
  })

  // https://github.com/jonschlinkert/micromatch/issues/24
  it('issue #24', function () {
    assert(!nm.isMatch('a', 'a/**'))
    assert(!nm.isMatch('a/b/c/d/', 'a/b/**/f'))
    assert(nm.isMatch('a', '**'))
    assert(nm.isMatch('a/', '**'))
    assert(nm.isMatch('a/b/c/d', '**'))
    assert(nm.isMatch('a/b/c/d/', '**'))
    assert(nm.isMatch('a/b/c/d/', '**/**'))
    assert(nm.isMatch('a/b/c/d/', '**/b/**'))
    assert(nm.isMatch('a/b/c/d/', 'a/b/**'))
    assert(nm.isMatch('a/b/c/d/', 'a/b/**/'))
    assert(nm.isMatch('a/b/c/d/e.f', 'a/b/**/**/*.*'))
    assert(nm.isMatch('a/b/c/d/e.f', 'a/b/**/*.*'))
    assert(nm.isMatch('a/b/c/d/g/e.f', 'a/b/**/d/**/*.*'))
    assert(nm.isMatch('a/b/c/d/g/g/e.f', 'a/b/**/d/**/*.*'))
  })

  // https://github.com/jonschlinkert/micromatch/issues/59
  it('should only match nested directories when `**` is the only thing in a segment', function () {
    assert(!nm.isMatch('a/b/c', 'a/b**'))
    assert(!nm.isMatch('a/c/b', 'a/**b'))
  })

  // https://github.com/jonschlinkert/micromatch/issues/63
  it('issue #63', function () {
    assert(nm.isMatch('/aaa/bbb/foo', '/aaa/bbb/**'))
    assert(nm.isMatch('/aaa/bbb/', '/aaa/bbb/**'))
    assert(nm.isMatch('/aaa/bbb/foo.git', '/aaa/bbb/**'))
    assert(nm.isMatch('/aaa/.git/foo', '/aaa/**/*', { dot: true }))
    assert(nm.isMatch('/aaa/bbb/.git', '/aaa/bbb/*', { dot: true }))
    assert(nm.isMatch('aaa/bbb/.git', 'aaa/bbb/**', { dot: true }))
    assert(nm.isMatch('/aaa/bbb/.git', '/aaa/bbb/**', { dot: true }))
    assert(nm.isMatch('/aaa/bbb/ccc/.git', '/aaa/bbb/**', { dot: true }))
    assert(!nm.isMatch('/aaa/bbb/.git', '/aaa/bbb/**'))
    assert(!nm.isMatch('aaa/bbb/.git', 'aaa/bbb/**'))
    assert(!nm.isMatch('/aaa/bbb/ccc/.git', '/aaa/bbb/**'))
    assert(!nm.isMatch('/aaa/.git/foo', '/aaa/**/*'))
  })
})

'use strict'

var isTravis = process.env.CI || process.env.TRAVIS
var assert = require('assert')
var isWindows = require('is-windows')
var nm = require('./support/matcher')

var fixtures = require('./_fixtures')
var patterns = require('./_patterns')

describe('.isMatch', function () {
  if (isWindows() || isTravis) {
    console.log(
      'these tests use bash to test for bash parity. since bash does not work on most versions of windows, these tests are skipped on windows',
    )
    return
  }

  patterns.forEach(function (pattern) {
    // if (pattern.slice(0, 3) !== '!**') return;
    // if (pattern.slice(0, 3) !== '!**') return;

    fixtures.forEach(function (fixture) {
      // if (fixture !== '!a/b/c') return;

      it('should match ' + fixture + ' with ' + pattern, function () {
        var nmRes = nm.isMatch(fixture, pattern)
        var mmRes = nm.mm.isMatch(fixture, pattern)
        var actual = nmRes === mmRes

        // minimatch is wrong on these
        if (actual === false) {
          // test minimatch.makeRe, since minimatch.match is inconsistent
          if (nmRes === nm.mm.makeRe(pattern).test(fixture)) {
            actual = true
          } else if (/^\?/.test(pattern)) {
            actual = true
          } else if (!isWindows() && !isTravis) {
            actual = nmRes === nm.bash.isMatch(fixture, pattern)
          } else {
            this.skip()
            return
          }
        }

        assert(actual, fixture + ' ' + pattern)
      })

      it('should match ' + fixture + ' with ' + pattern + ' and {dot: true}', function () {
        var nmRes = nm.isMatch(fixture, pattern, { dot: true })
        var mmRes = nm.mm.isMatch(fixture, pattern, { dot: true })
        var actual = nmRes === mmRes

        // minimatch is wrong on these
        if (actual === false) {
          // tie-breaker (minimatch is inconsistent with regex vs methods)
          if (nmRes === nm.mm.makeRe(pattern, { dot: true }).test(fixture)) {
            actual = true
          } else if (/^\?/.test(pattern) || /^\.\//.test(fixture)) {
            actual = true
          } else if (!isWindows() && !isTravis) {
            actual = nmRes === nm.bash.isMatch(fixture, pattern, { dot: true })
          } else {
            this.skip()
            return
          }
        }

        assert(actual, fixture + ' ' + pattern)
      })

      it('should match ' + fixture + ' with ' + pattern + ' and {nonegate: true}', function () {
        var nmRes = nm.isMatch(fixture, pattern, { nonegate: true })
        var mmRes = nm.mm.isMatch(fixture, pattern, { nonegate: true })
        var actual = nmRes === mmRes

        // minimatch is wrong on these
        if (actual === false) {
          // tie-breaker
          if (nmRes === nm.mm.makeRe(pattern, { nonegate: true }).test(fixture)) {
            actual = true
          } else if (/^\?/.test(pattern) || /^!/.test(fixture)) {
            actual = true
          } else if (!isWindows() && !isTravis) {
            actual = nmRes === nm.bash.isMatch(fixture, pattern)
          } else {
            this.skip()
            return
          }
        }

        assert(actual, fixture + ' ' + pattern)
      })
    })
  })
})

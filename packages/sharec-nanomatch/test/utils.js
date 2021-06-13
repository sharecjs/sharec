'use strict'

require('mocha')
var assert = require('assert')
var utils = require('../lib/utils')

describe('utils', function () {
  describe('.combineDupes', function () {
    it('should combine duplicate patterns in the given string', function () {
      assert.equal(utils.combineDupes('/*/*/*/*/', '*/'), '/*/')
      assert.equal(utils.combineDupes('/*/*/*/*/', '/*/*'), '/*/*/')
      assert.equal(utils.combineDupes('/**/**/**/*/', '**/'), '/**/*/')
      assert.equal(utils.combineDupes('/*/*/**/**/*/*/', '**/'), '/*/*/**/*/*/')
    })

    it('should take an array of patterns', function () {
      assert.equal(utils.combineDupes('/*/*/*/**/**/*/*/', ['**/', '/*(?=\\/(?!\\*\\*))']), '/*/**/*/')
      assert.equal(utils.combineDupes('/*/*/a/a/*/*/*', ['/*', '*/', 'a/']), '/*/a/*')
      assert.equal(utils.combineDupes('/*/*/a/a/*/*/*', '/*|*/|a/'), '/*/a/*')
    })

    it('should take an array of patterns', function () {
      assert.equal(utils.combineDupes('/*/*/*/*/a/a/', ['*/', 'a/']), '/*/a/')
    })
  })

  describe('.hasSpecialChars', function () {
    it('should return true when the pattern has wildcards', function () {
      assert(utils.hasSpecialChars('a*b'))
      assert(utils.hasSpecialChars('ab/*'))
    })

    it('should return true when the pattern has extglob characters', function () {
      assert(utils.hasSpecialChars('ab(x|y)'))
      assert(utils.hasSpecialChars('ab[1-4]'))
    })

    it('should return true for plus', function () {
      assert(utils.hasSpecialChars('a+b'))
    })

    it('should return false for dots', function () {
      assert(!utils.hasSpecialChars('a.b'))
    })

    it('should return true for dots at the beginning of a string', function () {
      assert(utils.hasSpecialChars('.a.b'))
      assert(utils.hasSpecialChars('.ab'))
    })

    it('should return true for dots following a slash', function () {
      assert(utils.hasSpecialChars('a/.a/a'))
      assert(utils.hasSpecialChars('/.a.b'))
      assert(utils.hasSpecialChars('./.a.b'))
      assert(utils.hasSpecialChars('./.ab'))
      assert(utils.hasSpecialChars('ab/.ab'))
      assert(utils.hasSpecialChars('/.ab'))
      assert(utils.hasSpecialChars('/.ab/foo'))
    })
  })
})

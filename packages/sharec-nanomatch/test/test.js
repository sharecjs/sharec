'use strict'

require('mocha')
var assert = require('assert')
var nm = require('..')

describe('nanomatch', function () {
  it('should export a function', function () {
    assert.equal(typeof nm, 'function')
  })
})

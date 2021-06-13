'use strict'

var nanomatch = require('../../..')

module.exports = function (file, pattern) {
  return nanomatch.isMatch(file, pattern)
}

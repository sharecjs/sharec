var nanomatch = require('../../..')

module.exports = function (files, pattern) {
  return nanomatch.match(files, pattern)
}

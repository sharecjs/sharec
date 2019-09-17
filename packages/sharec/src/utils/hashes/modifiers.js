const omit = require('lodash/omit')
const pick = require('lodash/pick')

const withKeys = (fun, keys) => (a, b) =>
  fun(...[a, b].map(param => pick(param, keys)))

const withoutKeys = (fun, keys) => (a, b) =>
  fun(...[a, b].map(param => omit(param, keys)))

module.exports = {
  withKeys,
  withoutKeys,
}

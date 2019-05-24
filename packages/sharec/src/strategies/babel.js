const pick = require('lodash/pick')
const omit = require('lodash/omit')
const fromPairs = require('lodash/fromPairs')
const toPairs = require('lodash/toPairs')
const deepmerge = require('deepmerge')
const {
  mergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  deepMergeHashesWithoutKeys,
} = require('../utils/strategies')

const strategy = (a, b) => {
  console.log(a)
  console.log(b)
}

module.exports = strategy

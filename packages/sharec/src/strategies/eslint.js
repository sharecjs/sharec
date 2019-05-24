const pick = require('lodash/pick')
const omit = require('lodash/omit')
const deepmerge = require('deepmerge')
const {
  mergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  deepMergeHashesWithoutKeys,
} = require('../utils/hashes')

const mergeParserOptions = () => {}

const strategy = (a, b) => {
  const newConfig = deepMergeHashesWithoutKeys(a, b, ['rules'])

  return Object.assign(newConfig, mergeHashesWithKeys(a, b, ['rules']))
}

module.exports = strategy

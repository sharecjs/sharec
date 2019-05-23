const pick = require('lodash/pick')
const omit = require('lodash/omit')
const deepmerge = require('deepmerge')
const {
  mergeHashes,
  mergeHashesWithFields,
  deepMergeHashesWithFields,
  deepMergeHashesWithoutFields,
} = require('../utils/strategies')

const mergeParserOptions = () => {}

const strategy = (a, b) => {
  const newConfig = deepMergeHashesWithoutFields(a, b, ['rules'])

  return Object.assign(newConfig, mergeHashesWithFields(a, b, ['rules']))
}

module.exports = strategy

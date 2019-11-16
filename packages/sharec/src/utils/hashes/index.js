const { withKeys, withoutKeys } = require('./modifiers')
const {
  mergeHashes,
  deepMergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  mergeHashesWithoutKeys,
  deepMergeHashesWithoutKeys,
} = require('./merge')
const { hashesDiff, shallowHashesChangesDiff } = require('./diff')
const {
  hashWithoutChangedFields,
  hashWithoutUnchangedFields,
} = require('./substract')

module.exports = {
  withKeys,
  withoutKeys,
  mergeHashes,
  deepMergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  mergeHashesWithoutKeys,
  deepMergeHashesWithoutKeys,
  hashesDiff,
  shallowHashesChangesDiff,
  hashWithoutChangedFields,
  hashWithoutUnchangedFields,
}

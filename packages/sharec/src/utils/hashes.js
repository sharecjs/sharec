const pick = require('lodash/pick')
const omit = require('lodash/omit')
const isEmpty = require('lodash/isEmpty')
const deepmerge = require('deepmerge')
const { addedDiff, updatedDiff } = require('deep-object-diff')

const withKeys = (fun, keys) => (a, b) =>
  fun(...[a, b].map(param => pick(param, keys)))

const withoutKeys = (fun, keys) => (a, b) =>
  fun(...[a, b].map(param => omit(param, keys)))

const mergeHashes = (a = {}, b = {}) => ({
  ...a,
  ...b,
})

const deepMergeHashes = (a = {}, b = {}) => deepmerge(a, b)

const mergeHashesWithKeys = (a = {}, b = {}, keys = []) =>
  withKeys(mergeHashes, keys)(a, b)

const deepMergeHashesWithKeys = (a = {}, b = {}, keys = []) =>
  withKeys(deepmerge, keys)(a, b)

const mergeHashesWithoutKeys = (a = {}, b = {}, keys = []) =>
  withoutKeys(mergeHashes, keys)(a, b)

const deepMergeHashesWithoutKeys = (a = {}, b = {}, keys = []) =>
  withoutKeys(deepmerge, keys)(a, b)

const hashesChangesDiff = (a, b) => ({
  ...addedDiff(a, b),
  ...updatedDiff(a, b),
})

const shallowHashesChangesDiff = (a = {}, b = {}) => {
  const hashesDiff = {}

  Object.keys(b).forEach(key => {
    const isComparingObjects =
      a[key] instanceof Object && b[key] instanceof Object
    let hasDiff = false

    if (isComparingObjects) {
      hasDiff = !isEmpty(hashesChangesDiff(a[key], b[key]))
    }

    if (!hasDiff) {
      hasDiff = !a[key] || a[key] !== b[key]
    }

    if (hasDiff) {
      Object.assign(hashesDiff, {
        [key]: b[key],
      })
    }
  })

  return hashesDiff
}

module.exports = {
  withKeys,
  withoutKeys,
  mergeHashes,
  deepMergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  mergeHashesWithoutKeys,
  deepMergeHashesWithoutKeys,
  shallowHashesChangesDiff,
  hashesChangesDiff,
}

const set = require('lodash/set')
const pick = require('lodash/pick')
const omit = require('lodash/omit')
const isObject = require('lodash/isObject')
const isNil = require('lodash/isNil')
const deepmerge = require('deepmerge')
const { diff } = require('deep-diff')

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

const hashesDiff = (a = {}, b = {}) => {
  const resultDiff = {}
  const changes = diff(a, b)

  if (!changes) return {}

  changes.forEach(change => {
    // TODO: handle changes with kind A
    if (change.kind !== 'N' && change.kind !== 'A') {
      const { path, lhs } = change

      set(resultDiff, path, lhs)
    }
  })

  return resultDiff
}

const shallowHashesChangesDiff = (a = {}, b = {}) => {
  const resultDiff = {}

  Object.keys(a).forEach(key => {
    const isComparingObjects = isObject(a[key]) && isObject(b[key])
    const hasDiff = isComparingObjects
      ? !!diff(a[key], b[key])
      : isNil(a[key]) || a[key] !== b[key]

    if (hasDiff) {
      Object.assign(resultDiff, {
        [key]: a[key],
      })
    }
  })

  return resultDiff
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
  hashesDiff,
  shallowHashesChangesDiff,
}

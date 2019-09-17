const set = require('lodash/set')
const isObject = require('lodash/isObject')
const isNil = require('lodash/isNil')
const { diff } = require('deep-diff')

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
  hashesDiff,
  shallowHashesChangesDiff,
}

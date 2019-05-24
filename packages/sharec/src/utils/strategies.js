const last = require('lodash/last')
const chunk = require('lodash/chunk')
const pick = require('lodash/pick')
const omit = require('lodash/omit')
const deepmerge = require('deepmerge')

// Pairs

const toPairs = obj =>
  Object.keys(obj).reduce((acc, key) => {
    if (obj[key] instanceof Object && Object.keys(obj[key]).length === 0) {
      return acc.concat([[key]])
    }

    return acc.concat([[key, obj[key]]])
  }, [])

const fromPairs = pairs =>
  pairs.reduce((acc, pair) => {
    if (pair.length === 1) {
      return Object.assign(acc, {
        [pair[0]]: {},
      })
    }

    return Object.assign(acc, {
      [pair[0]]: pair[1],
    })
  }, {})

const fillPairs = pairs =>
  pairs.map(pair => (!(pair instanceof Array) ? [pair, {}] : pair))

const mergePairs = (a = [], b = []) => {
  const noramlizedHashFromA = fromPairs(fillPairs(a))
  const normalizedHashFromB = fromPairs(fillPairs(b))

  return toPairs({
    ...noramlizedHashFromA,
    ...normalizedHashFromB,
  })
}

const deepMergePairs = (a = [], b = []) => {
  const noramlizedHashFromA = fromPairs(fillPairs(a))
  const normalizedHashFromB = fromPairs(fillPairs(b))

  return toPairs(deepmerge(noramlizedHashFromA, normalizedHashFromB))
}

const mergePairsWithKeys = (a = [], b = [], fields = []) => {}

const mergePairsWithoutKeys = (a = [], b = [], fields = []) => {}

const deepMergePairsWithKeys = (a = [], b = [], fields = []) => {}

const deepMergePairsWithoutKeys = (a = [], b = [], fields = []) => {}

module.exports = {
  toPairs,
  fromPairs,
  fillPairs,
  mergePairs,
  deepMergePairs,
  mergePairsWithKeys,
  mergePairsWithoutKeys,
  deepMergePairsWithKeys,
  deepMergePairsWithoutKeys,
}

const pick = require('lodash/pick')
const {
  mergeHashes,
  deepMergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  mergeHashesWithoutKeys,
  deepMergeHashesWithoutKeys,
  hashesChangesDiff,
} = require('./hashes')
const { pipe } = require('./index')

const toPairs = obj =>
  Object.keys(obj).reduce((acc, key) => {
    if (obj[key] instanceof Object && Object.keys(obj[key]).length === 0) {
      return acc.concat([key])
    }

    return acc.concat([[key, obj[key]]])
  }, [])

const toPairsWithKeys = (obj, keys) => toPairs(pick(obj, keys))

const fromPairs = pairs => {
  return pairs.reduce((acc, pair) => {
    if (pair.length === 1 || !Array.isArray(pair)) {
      return Object.assign(acc, {
        [pair[0]]: {},
      })
    }

    return Object.assign(acc, {
      [pair[0]]: pair[1],
    })
  }, {})
}

const fillPairs = pairs =>
  pairs.map(pair => {
    if (!Array.isArray(pair)) {
      return [pair]
    }

    return pair
  })

const mergePairs = (a = [], b = []) => {
  const hashedA = pipe(
    fillPairs,
    fromPairs,
  )(a)
  const hashedB = pipe(
    fillPairs,
    fromPairs,
  )(b)

  return pipe(
    mergeHashes,
    toPairs,
  )(hashedA, hashedB)
}

const deepMergePairs = (a = [], b = []) => {
  const hashedA = fromPairs(a)
  const hashedB = fromPairs(b)

  return toPairs(deepMergeHashes(hashedA, hashedB))
}

const mergePairsWithKeys = (a = [], b = [], keys = []) => {
  const hashedA = fromPairs(a)
  const hashedB = fromPairs(b)

  return toPairs(mergeHashesWithKeys(hashedA, hashedB, keys))
}

const mergePairsWithoutKeys = (a = [], b = [], keys = []) => {
  const hashedA = fromPairs(a)
  const hashedB = fromPairs(b)

  return toPairs(mergeHashesWithoutKeys(hashedA, hashedB, keys))
}

const deepMergePairsWithKeys = (a = [], b = [], keys = []) => {
  const hashedA = fromPairs(a)
  const hashedB = fromPairs(b)

  return toPairs(deepMergeHashesWithKeys(hashedA, hashedB, keys))
}

const deepMergePairsWithoutKeys = (a = [], b = [], keys = []) => {
  const hashedA = fromPairs(a)
  const hashedB = fromPairs(b)

  return toPairs(deepMergeHashesWithoutKeys(hashedA, hashedB, keys))
}

const pairsChangesDiff = (a, b) => {
  const hashedA = fromPairs(a)
  const hashedB = fromPairs(b)

  return toPairs(hashesChangesDiff(hashedA, hashedB))
}

module.exports = {
  toPairs,
  toPairsWithKeys,
  fromPairs,
  fillPairs,
  mergePairs,
  deepMergePairs,
  mergePairsWithKeys,
  mergePairsWithoutKeys,
  deepMergePairsWithKeys,
  deepMergePairsWithoutKeys,
  pairsChangesDiff,
}

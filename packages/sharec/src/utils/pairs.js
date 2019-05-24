const deepmerge = require('deepmerge')
const {
  mergeHashes,
  deepMergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  mergeHashesWithoutKeys,
  deepMergeHashesWithoutKeys,
} = require('./hashes')

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
  pairs.map(pair => {
    if (!Array.isArray(pair)) {
      return [pair]
    }

    return pair
  })

const mergePairs = (a = [], b = []) => {
  const hashedA = fromPairs(a)
  const hashedB = fromPairs(b)

  return toPairs(mergeHashes(hashedA, hashedB))
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

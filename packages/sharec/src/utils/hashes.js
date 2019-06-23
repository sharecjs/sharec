const pick = require('lodash/pick')
const omit = require('lodash/omit')
const xor = require('lodash/xor')
const deepmerge = require('deepmerge')

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

const intersectHashes = (a, b) => {
  const hashesIntersection = {}

  Object.keys(b).forEach(key => {
    if (a[key] && a[key] === b[key]) {
      Object.assign(hashesIntersection, {
        [key]: b[key],
      })
    }
  })

  return hashesIntersection
}

const deepIntersectHashes = (a, b) => {
  const hashesIntersection = {}

  Object.keys(b).forEach(key => {
    if (!a[key] || (!(a[key] instanceof Object) && a[key] !== b[key])) return

    if (a[key] instanceof Object) {
      const res = deepIntersectHashes(a[key], b[key])

      Object.assign(hashesIntersection, {
        [key]: res,
      })
    } else {
      Object.assign(hashesIntersection, {
        [key]: b[key],
      })
    }
  })

  return hashesIntersection
}

const createIntersectionMap = intersection => {
  const intersectedKeys = Object.keys(intersection)
  const intersectionMap = {
    $$root: intersectedKeys.filter(
      key => !(intersection[key] instanceof Object),
    ),
  }
  const intersectedKeysWithObjects = xor(
    intersectedKeys,
    intersectionMap.$$root,
  )

  if (intersectedKeysWithObjects.length === 0) {
    return intersectionMap
  }

  intersectedKeysWithObjects.forEach(key => {
    const subMap = createIntersectionMap(intersection[key])

    Object.assign(intersectionMap, {
      [key]: subMap,
    })
  })

  return intersectionMap
}

const removeHashesIntersection = (a, b) => {
  const intersection = intersectHashes(a, b)
  const intersectionMap = createIntersectionMap(intersection)

  return omit(a, intersectionMap.$$root)
}

const deepRemoveHashesIntersection = (a = {}, b = {}) => {
  const intersection = deepIntersectHashes(a, b)
  const intersectionMap = createIntersectionMap(intersection)
  const clearedConfig = {}

  if (intersectionMap.$$root) {
    Object.assign(clearedConfig, omit(a, intersectionMap.$$root))
  }

  const intersectionNestedObjectsKeys = Object.keys(intersectionMap).filter(
    key => key !== '$$root',
  )

  intersectionNestedObjectsKeys.forEach(key => {
    Object.assign(clearedConfig, {
      [key]: deepRemoveHashesIntersection(a[key], b[key]),
    })
  })

  return clearedConfig
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
  intersectHashes,
  deepIntersectHashes,
  createIntersectionMap,
  removeHashesIntersection,
  deepRemoveHashesIntersection,
}

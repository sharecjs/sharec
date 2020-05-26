/**
 * Works like lodash/pick, but with maps
 * Picks entries from target map by given keys and returns new map
 * @param {Map} target Target map
 * @param {Array<String>} keys List of keys which should be picked
 * @returns {Map}
 */
const pick = (target, keys) => {
  const result = new Map()

  target.forEach((value, key) => {
    if (!keys.includes(key)) return

    result.set(key, value)
  })

  return result
}

/**
 * Works like lodash/pickBy, but with maps
 * Picks entries from target map by given predicate and returns new map
 * @param {Map} target Target map
 * @param {Function} predicate Function checker
 * @returns {Map}
 */
const pickBy = (target, predicate) => {
  const result = new Map()

  target.forEach((value, key) => {
    if (!predicate(value, key)) return

    result.set(key, value)
  })

  return result
}

/**
 * Works like lodash/omit, but with maps
 * Removes entries from target map by given keys and returns new map
 * @param {Map} target Target map
 * @param {Array<String>} keys List of keys which should be removed
 * @returns {Map}
 */
const omit = (target, keys) => {
  const result = new Map(target)

  target.forEach((_, key) => {
    if (!keys.includes(key)) return

    result.delete(key)
  })

  return result
}

/**
 * Works like lodash/omitBy, but with maps
 * Removes entries from target map by given predicate and returns new map
 * @param {Map} target Target map
 * @param {Function} predicate Function checker
 * @returns {Map}
 */
const omitBy = (target, predicate) => {
  const result = new Map(target)

  target.forEach((value, key) => {
    if (!predicate(value, key)) return

    result.delete(key)
  })

  return result
}

module.exports = {
  pick,
  omit,
  pickBy,
  omitBy,
}

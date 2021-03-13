// @ts-check

const identity = require('lodash/identity')

/**
 * @typedef {import('types/Schema').SchemaParams<any[]>} SchemaAnyListParams
 */

/**
 * Merges each value in lists by index with given atom
 * @param {Function} atom
 * @returns {Function}
 */
const listMergeAtom = (atom) =>
  /**
   * @param {SchemaAnyListParams} params
   * @returns {any[]}
   */
  ({ current, upcoming, cached }) => {
    // TODO: what better to do with arrays with different length?
    if (current && upcoming === undefined) return current
    if (current === undefined && upcoming) return upcoming

    const resultLength = Math.max(current.length, upcoming.length)
    const result = new Array(resultLength)

    for (let i = 0; i < result.length; i++) {
      const cachedElement = cached ? cached[i] : undefined

      if (current[i] === undefined && upcoming[i]) {
        result[i] = upcoming[i]
        continue
      }

      if (current[i] && upcoming[i] === undefined) {
        result[i] = current[i]
        continue
      }

      result[i] = atom({
        current: current[i],
        upcoming: upcoming[i],
        cached: cachedElement,
      })
    }

    return result.filter(identity)
  }

module.exports = listMergeAtom

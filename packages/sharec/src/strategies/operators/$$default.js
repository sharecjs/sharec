const omit = require('lodash/omit')
const pick = require('lodash/pick')
const without = require('lodash/without')

/**
 * @param {Object} params
 * @param {Object} [params.target]
 * @param {Array<String>} [params.ignore]
 * @param {Function} params.strategy
 * @returns {Function}
 */
const $$default = ({ target = {}, ignore = [], strategy }) =>
  /**
   * @param {Object} params
   * @returns {Object}
   */
  ({ current, upcoming, cached = {} }) => {
    const targetKeys = Object.keys(target)
    const currentKeys = Object.keys(current)
    const upcomingKeys = Object.keys(upcoming)
    const staticKeys = without(currentKeys, ...[].concat(upcomingKeys, targetKeys))
    const newFields = omit(upcoming, targetKeys)
    let result = pick(current, staticKeys)

    for (const key in newFields) {
      const isIgnoredField = ignore.includes(key)

      if (isIgnoredField && current && current[key]) {
        result[key] = current[key]
        continue
      }

      if (isIgnoredField) {
        continue
      }

      result[key] = strategy({
        current: current[key],
        upcoming: upcoming[key],
        cached: cached[key],
      })
    }

    return {
      ...target,
      ...result,
    }
  }

module.exports = $$default

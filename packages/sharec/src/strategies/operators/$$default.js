const omit = require('lodash/omit')

/**
 * @param {Object} params
 * @param {Object} [params.target]
 * @param {Function} params.strategy
 * @returns {Function}
 */
const $$default = ({ target = {}, strategy }) =>
  /**
   * @param {Object} params
   * @returns {Object}
   */
  ({ current, upcoming, cached = {} }) => {
    let result = {}
    const targetFields = omit(upcoming, Object.keys(target))

    for (const key in targetFields) {
      Object.assign(result, {
        [key]: strategy({
          current: current[key],
          upcoming: upcoming[key],
          cached: cached[key],
        }),
      })
    }

    return {
      ...target,
      ...result,
    }
  }

module.exports = $$default

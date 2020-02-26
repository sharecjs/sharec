// TODO: rename to fallback
/**
 * @param {...Array<Function>} schemas
 * @returns {Function}
 */
const variant = (...schemas) =>
  /**
   * @param {Object} params
   * @returns {Array}
   */
  params => {
    let result

    for (const schema of schemas) {
      try {
        result = schema(params)

        break
      } catch (err) {
        continue
      }
    }

    if (result === undefined) return params.upcoming

    return result
  }

module.exports = variant

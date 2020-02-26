// TODO: rename to fallback
/**
 * @param {...Array<Function>} atoms
 * @returns {Function}
 */
const variant = (...atoms) =>
  /**
   * @param {Object} params
   * @returns {Array}
   */
  params => {
    let result

    for (const atom of atoms) {
      try {
        result = atom(params)
        break
      } catch (err) {
        continue
      }
    }

    if (result === undefined) return params.upcoming

    return result
  }

module.exports = variant

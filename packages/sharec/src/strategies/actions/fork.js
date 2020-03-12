/**
 * @param {Array<Array|Function>} cases
 * @returns {Function}
 */
const fork = cases =>
  /**
   * @param {Object} params
   * @returns {*}
   */
  params => {
    const targetCase = cases.find(c => {
      if (!Array.isArray(c)) return c
      if (params.current) return c[0](params.current)

      return c[0](params.upcoming)
    })
    const targetAtom = Array.isArray(targetCase) ? targetCase[1] : targetCase

    return targetAtom(params)
  }

module.exports = fork

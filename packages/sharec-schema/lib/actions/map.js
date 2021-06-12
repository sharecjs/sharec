// @ts-check

/**
 * Maps functions by strings and RegExps
 * Mapped functions will be returned by given matchers
 *
 * ```
 * const mapper = map(['foo', () => 1, 'bar', () => 2])
 *
 * mapper('foo')() // 1
 * mapper('bar')() // 2
 * mapper('baz')() // null
 * ```
 *
 * @param {...[string | RegExp, Function]} mappers
 * @returns {Function}
 */
const map = (...mappers) =>
  /**
   * @param {string} filename
   * @returns {Function}
   */
  (filename) => {
    const mapper = mappers.find((mapper) => {
      if (mapper[0] instanceof RegExp) {
        return mapper[0].test(filename)
      }

      return mapper[0] === filename
    })

    if (!mapper) return null

    return mapper[1]
  }

module.exports = map

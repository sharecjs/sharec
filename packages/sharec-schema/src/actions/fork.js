// @ts-check

/**
 * Creates conditional sequence of functions with predicates
 * The last argument is default function
 * Each condition branch should be an array, where first element is predicate function
 * Second element is the target function and it will be applyed only if predicate return true
 *
 * ```
 * const handler = arr => arr.map(item => item * item)
 * const identity = val => val
 * const forkTest = fork([[Array.isArray, handler], identity])
 *
 * forkTest([1, 2, 3]) // [1, 4, 9]
 * forkTest(1) // 1
 * ```
 *
 * @param {Array<Array|Function>} cases
 * @returns {Function}
 */
const fork = (cases) =>
  /**
   * @param {Object} params
   * @returns {*}
   */
  (params) => {
    const targetCase = cases.find((c) => {
      if (!Array.isArray(c)) return c
      if (params.current) return c[0](params.current)

      return c[0](params.upcoming)
    })
    const targetAtom = Array.isArray(targetCase) ? targetCase[1] : targetCase

    return targetAtom(params)
  }

module.exports = fork

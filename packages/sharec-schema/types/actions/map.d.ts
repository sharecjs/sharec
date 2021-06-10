export = map
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
declare function map(...mappers: [string | RegExp, Function][]): Function

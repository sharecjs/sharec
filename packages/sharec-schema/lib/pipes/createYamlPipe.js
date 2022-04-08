// @ts-check
const flow = require('lodash.flow')
const toJson = require('./toJson')
const fromJson = require('./fromJson')
const toYaml = require('./toYaml')
const fromYaml = require('./fromYaml')

/**
 * @typedef {import('../').SchemaParams<string>} SchemaYamlParams
 */

/**
 * Creates function with given handlers which accepts params in YAML format
 * and returns data in the same format
 * @param {...Function[]} handlers
 * @returns {Function}
 */
const createYamlPipe = (...handlers) =>
  /**
   * @param {SchemaYamlParams} params
   * @returns {SchemaYamlParams}
   */
  (params) => {
    const isSingleQuote = params.current && /'/gm.test(params.current)
    // @ts-ignore
    const pipe = flow(fromYaml, fromJson, ...handlers, toJson, toYaml)
    const result = pipe(params)

    if (isSingleQuote) return result.replace(/"/gm, "'")

    return result.replace(/'/gm, '"')
  }

module.exports = createYamlPipe

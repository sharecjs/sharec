const flow = require('lodash/flow')
const omit = require('lodash/omit')
const pick = require('lodash/pick')
const isEmpty = require('lodash/isEmpty')
const operators = require('../operators')

const operatorsKeys = Object.keys(operators)

/**
 * @param {Object} schema
 * @returns {Function}
 */
const compose = schema =>
  /**
   * @param {Object} params
   * @param {Object} options
   * @param {Boolean} [options.overwrite]
   * @returns {Object}
   */
  params => {
    const { current, upcoming, cached } = params

    if (upcoming === undefined) return current
    if (current === undefined) return upcoming
    if (typeof current !== typeof upcoming) return upcoming
    if (Array.isArray(schema)) return schema[0](params)

    let result = {}
    const schemaWithoutOperators = omit(schema, operatorsKeys)

    for (const key in schemaWithoutOperators) {
      if (!current[key] && !upcoming[key]) continue

      result[key] = schemaWithoutOperators[key]({
        current: current[key],
        upcoming: upcoming[key],
        cached: cached && cached[key],
      })
    }

    const isOperatorsExists = !flow(
      pick,
      isEmpty,
    )(schema, operatorsKeys)

    if (!isOperatorsExists) return result
    if (schema.$$default) {
      result = operators.$$default({
        target: result,
        ignore: schema.$$ignore,
        strategy: schema.$$default,
      })(params)
    }

    return result
  }

module.exports = compose

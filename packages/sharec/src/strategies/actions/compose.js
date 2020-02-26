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
const applyToList = schema =>
  /**
   * @param {Object} params
   * @returns {Array}
   */
  ({ current, upcoming, cached }) => {
    let result = []

    for (const i in upcoming) {
      result.push(
        schema({
          current: current[i],
          upcoming: upcoming[i],
          cached: cached[i],
        }),
      )
    }

    return result
  }

/**
 * @param {Object} schema
 * @returns {Function}
 */
const compose = schema =>
  /**
   * @param {Object} params
   * @returns {Object}
   */
  params => {
    const { current, upcoming, cached = {} } = params

    if (!upcoming) return current
    if (!current) return upcoming
    if (Array.isArray(schema)) {
      return applyToList(schema[0])({ current, upcoming, cached })
    }

    let result = {}
    const schemaWithoutOperators = omit(schema, operatorsKeys)

    for (const key in schemaWithoutOperators) {
      Object.assign(result, {
        [key]: schemaWithoutOperators[key]({
          current: current[key],
          upcoming: upcoming[key],
          cached: cached[key],
        }),
      })
    }

    const isOperatorsExists = !flow(
      pick,
      isEmpty,
    )(schema, operatorsKeys)

    if (!isOperatorsExists) return result
    if (schema.$$default) {
      return operators.$$default({
        target: result,
        strategy: schema.$$default,
      })(params)
    }

    return result
  }

module.exports = compose

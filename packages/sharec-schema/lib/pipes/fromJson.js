// @ts-check
const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const mapValues = require('lodash/mapValues')
const { fromJSON } = require('../parsers/json')

/**
 * @typedef {import('../').SchemaParams<string>} SchemaJsonParams
 * @typedef {import('../').SchemaParams<Map<string, any>>} SchemaHashParams
 */

/**
 * Transforms JSON params to Hash params
 * @param {SchemaJsonParams} params
 * @returns {SchemaHashParams}
 */
const fromJsonPipe = (params) => {
  const sanitizedParams = omitBy(params, isUndefined)

  return mapValues(sanitizedParams, fromJSON)
}

module.exports = fromJsonPipe

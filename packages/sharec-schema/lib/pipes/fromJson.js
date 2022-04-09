// @ts-check
const omitBy = require('lodash.omitby')
const isUndefined = require('lodash.isundefined')
const mapValues = require('lodash.mapvalues')
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

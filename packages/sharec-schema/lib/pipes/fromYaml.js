// @ts-check
const omitBy = require('lodash.omitby')
const isUndefined = require('lodash.isundefined')
const mapValues = require('lodash.mapvalues')
const { fromYAML } = require('../parsers/yaml')

/**
 * @typedef {import('../').SchemaParams<string>} SchemaYamlParams
 * @typedef {import('../').SchemaParams<Map<string, any>>} SchemaHashParams
 */

/**
 * Transforms JSON params to Hash params
 * @param {SchemaYamlParams} params
 * @returns {SchemaHashParams}
 */
const fromYaml = (params) => {
  const sanitizedParams = omitBy(params, isUndefined)

  return mapValues(sanitizedParams, fromYAML)
}

module.exports = fromYaml

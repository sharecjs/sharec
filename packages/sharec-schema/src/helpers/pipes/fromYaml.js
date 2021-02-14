const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const mapValues = require('lodash/mapValues')
const { fromYAML } = require('../../parsers/yaml')

const fromYaml = (params) => {
  const sanitizedParams = omitBy(params, isUndefined)

  return mapValues(sanitizedParams, fromYAML)
}

module.exports = fromYaml

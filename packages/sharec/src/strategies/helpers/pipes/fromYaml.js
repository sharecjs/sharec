const { safeLoad } = require('js-yaml')
const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const mapValues = require('lodash/mapValues')

const fromYaml = params => {
  const sanitizedParams = omitBy(params, isUndefined)

  return mapValues(sanitizedParams, safeLoad)
}

module.exports = fromYaml

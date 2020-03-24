const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const mapValues = require('lodash/mapValues')

const fromJson = params => {
  const sanitizedParams = omitBy(params, isUndefined)

  return mapValues(sanitizedParams, JSON.parse)
}
module.exports = fromJson

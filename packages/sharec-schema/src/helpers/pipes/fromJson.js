const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const mapValues = require('lodash/mapValues')
const { fromJSON } = require('../../parsers/json')

const fromJsonPipe = (params) => {
  const sanitizedParams = omitBy(params, isUndefined)

  return mapValues(sanitizedParams, fromJSON)
}

module.exports = fromJsonPipe

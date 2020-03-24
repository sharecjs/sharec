const mapValues = require('lodash/mapValues')

const toJson = params =>
  mapValues(params, input => JSON.stringify(input, null, 2))

module.exports = toJson

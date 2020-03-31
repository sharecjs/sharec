const flow = require('lodash/flow')
const toJson = require('./toJson')
const fromJson = require('./fromJson')

const createJsonPipe = (...handlers) =>
  flow(
    fromJson,
    ...handlers,
    toJson,
  )

module.exports = createJsonPipe

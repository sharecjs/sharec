// @ts-check
const flow = require('lodash.flow')
const toJson = require('./toJson')
const fromJson = require('./fromJson')

/**
 * Creates function with given handlers which accepts params in JSON format
 * and returns data in the same format
 * @param {...Function[]} handlers
 * @returns {Function}
 */
// @ts-ignore
const createJsonPipe = (...handlers) => flow(fromJson, ...handlers, toJson)

module.exports = createJsonPipe

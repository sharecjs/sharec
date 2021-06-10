// @ts-check
const { toJSON } = require('../parsers/json')

/**
 * Transforms Map to JSON-string
 * @param {Map<string, any>} input
 * @returns {string}
 */
const toJsonPipe = (input) => toJSON(input)

module.exports = toJsonPipe

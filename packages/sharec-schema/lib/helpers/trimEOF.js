// @ts-check
const { cutEOF } = require('sharec-utils/lib/format')

/** @typedef {import('../').SchemaParams<string>} SchemaParams */

/**
 * Trims EOL from all given strings mapped by any keys
 * @param {SchemaParams} params
 * @returns {SchemaParams}
 */
function trimEOF(params) {
  return Object.keys(params).reduce(
    (acc, key) =>
      Object.assign(acc, {
        [key]: params[key] ? cutEOF(params[key]) : params[key],
      }),
    {},
  )
}

module.exports = trimEOF

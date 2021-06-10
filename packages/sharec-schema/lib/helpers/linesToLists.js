// @ts-check
// TODO: move to parsers
/**
 * @typedef {import('../').SchemaParams<string>} SchemaStringParams
 * @typedef {import('../').SchemaParams<string[]>} SchemaListParams
 */

/**
 * Splits given lines to mapped strings lists
 * @param {SchemaStringParams} params
 * @returns {SchemaListParams}
 */
function linesToLists(params) {
  return Object.keys(params).reduce(
    (acc, key) =>
      Object.assign(acc, {
        [key]: typeof params[key] === 'string' ? params[key].split(/\n/gm) : params[key],
      }),
    {},
  )
}

module.exports = linesToLists

// @ts-check
const eofRegexp = /(\n|\n\r)$/

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
        [key]: eofRegexp.test(params[key]) ? params[key].replace(eofRegexp, '') : params[key],
      }),
    {},
  )
}

module.exports = trimEOF

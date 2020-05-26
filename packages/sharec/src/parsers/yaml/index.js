const { safeLoad, safeDump } = require('js-yaml')

/**
 * Creates JSON string from YAML string with order saving
 * @param {String} str Raw YAML string
 * @returns {String}
 */
const fromYAML = (str) => JSON.stringify(safeLoad(str), null, 2)

/**
 * Transforms given JSON string to YAML string with order saving
 * @param {String} str JSON string
 * @returns {String}
 */
const toYAML = (str) => safeDump(JSON.parse(str))

module.exports = {
  fromYAML,
  toYAML,
}

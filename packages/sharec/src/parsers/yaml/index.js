const { load, dump } = require('js-yaml')

/**
 * Creates JSON string from YAML string with order saving
 * @param {String} str Raw YAML string
 * @returns {String}
 */
const fromYAML = (str) => JSON.stringify(load(str), null, 2)

/**
 * Transforms given JSON string to YAML string with order saving
 * @param {String} str JSON string
 * @returns {String}
 */
const toYAML = (str) => dump(JSON.parse(str))

module.exports = {
  fromYAML,
  toYAML,
}

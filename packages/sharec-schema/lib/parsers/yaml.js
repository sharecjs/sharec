// @ts-check
const { load, dump } = require('js-yaml')

/**
 * Creates JSON string from YAML string with order saving
 * @param {string} str Raw YAML string
 * @returns {string}
 */
const fromYAML = (str) => JSON.stringify(load(str), null, 2)

/**
 * Transforms given JSON string to YAML string with order saving
 * @param {string} str JSON string
 * @returns {string}
 */
const toYAML = (str) => dump(JSON.parse(str))

module.exports = {
  fromYAML,
  toYAML,
}

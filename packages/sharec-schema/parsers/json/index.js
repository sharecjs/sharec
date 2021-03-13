// @ts-check

const json8 = require('json8')

const COMMENTS_REG = /\s+?(\/{2}|\/\*)\s?.+/gm

/**
 * Creates map from JSON string with order saving
 * @param {string} str Raw JSON string
 * @returns {Map}
 */
const fromJSON = (str) => {
  let rawJSON = str

  if (COMMENTS_REG.test(str)) {
    rawJSON = rawJSON.replace(COMMENTS_REG, '')
  }

  return json8.parse(rawJSON, { map: true })
}

/**
 * Transforms given map to JSON string with order saving
 * @param {Map} map Any map
 * @param {number} [space] Indent spaces count
 * @returns {string}
 */
const toJSON = (map, space = 2) => json8.serialize(map, { space })

module.exports = {
  fromJSON,
  toJSON,
}

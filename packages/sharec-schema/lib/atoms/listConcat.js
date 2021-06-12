// @ts-check

const isEqual = require('lodash/isEqual')
const uniqWith = require('lodash/uniqWith')

/**
 * @typedef {import('../').SchemaParams<string[]>} SchemaListParams
 */

/**
 * Creates list of unique values from lists-params
 * @param {SchemaListParams} params
 * @returns {string[]}
 */
function listConcatAtom({ current, upcoming }) {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming

  return uniqWith([...current, ...upcoming], isEqual)
}

module.exports = listConcatAtom

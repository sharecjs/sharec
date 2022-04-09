// @ts-check
const flow = require('lodash.flow')
const { trimEOF, linesToLists } = require('../helpers')
const listConcatAtom = require('./listConcat')

/**
 * @typedef {import('../').SchemaParams<string>} SchemaLinesParams
 */

/**
 * Merges lines (string separated by EOLs)
 * Doesn't remove duplicates, just concat lines or remove deleted ones
 * @param {SchemaLinesParams} params
 * @returns {string}
 */
function linesConcatAtom(params) {
  const { current, upcoming } = params

  if (current === undefined && upcoming) return upcoming
  if (current && upcoming === undefined) return current

  const result = listConcatAtom(flow(trimEOF, linesToLists)(params))

  return result.join('\n')
}

module.exports = linesConcatAtom

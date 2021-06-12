// @ts-check

const isEqual = require('lodash/isEqual')

/**
 * @typedef {import('../').Rule} Rule
 * @typedef {import('../').SchemaParams<Rule>} SchemaRulesParams
 */

/**
 * Merges rules-like data-strutures (eslint, stylelint etc. rules)
 * Doesn't merge anything, only returns required one, because rule can't be correctly
 * merged
 * Mostly, rule changes mean that rule is not correct anymore
 * @param {SchemaRulesParams} params
 * @returns {Rule}
 */
function ruleAtom({ current, upcoming, cached }) {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming
  if (cached !== undefined && !isEqual(current, cached)) return current
  if (!isEqual(current, upcoming)) return upcoming

  return current
}

module.exports = ruleAtom

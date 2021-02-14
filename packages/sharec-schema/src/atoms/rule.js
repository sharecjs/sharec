const isEqual = require('lodash/isEqual')

function ruleAtom({ current, upcoming, cached }) {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming
  if (cached !== undefined && !isEqual(current, cached)) return current
  if (!isEqual(current, upcoming)) return upcoming

  return current
}

module.exports = ruleAtom

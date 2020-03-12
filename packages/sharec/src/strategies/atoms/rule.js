const isEqual = require('lodash/isEqual')

function ruleAtom({ current, upcoming }) {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming

  if (!isEqual(current, upcoming)) return upcoming

  return current
}

module.exports = ruleAtom

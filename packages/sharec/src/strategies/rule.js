const isEqual = require('lodash/isEqual')

function ruleStrategy({ current, upcoming, cached }) {
  if (current && !upcoming) return current
  if (!current && upcoming) return upcoming

  if (!isEqual(current, upcoming)) return upcoming

  return current
}

module.exports = ruleStrategy

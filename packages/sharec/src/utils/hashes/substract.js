const unset = require('lodash/unset')
const set = require('lodash/set')
const { diff } = require('deep-diff')

const hashWithoutChangedFields = (a, b) => {
  const changesDiff = diff(a, b)

  if (!changesDiff) return a

  const result = { ...a }

  changesDiff.forEach(change => {
    if (change.kind !== 'E') return

    unset(result, change.path)
  })

  return result
}

const hashWithoutUnchangedFields = (a, b) => {
  const changesDiff = diff(a, b)

  if (!b) return a

  if (!changesDiff) return {}

  const result = {}

  changesDiff.forEach(change => {
    if (change.kind !== 'N' || (change.kind === 'D' && change.lhs)) {
      set(result, change.path, change.lhs)
    }
  })

  return result
}

module.exports = {
  hashWithoutChangedFields,
  hashWithoutUnchangedFields,
}

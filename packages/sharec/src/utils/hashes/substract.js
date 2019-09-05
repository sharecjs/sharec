const unset = require('lodash/unset')
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

module.exports = {
  hashWithoutChangedFields,
}

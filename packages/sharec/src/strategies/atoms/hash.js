const isEqual = require('lodash/isEqual')

function omitChanged(target, cached) {
  let result = new Map()

  if (!cached) return result

  target.forEach((value, key) => {
    if (!cached.has(key) || isEqual(cached.get(key), value)) return

    result.set(key)
  })

  return result
}

function hashAtom({ current, upcoming, cached }) {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming

  let result = new Map(current)

  if (cached !== undefined) {
    const ignoredFields = omitChanged(current, cached)

    upcoming.forEach((value, key) => {
      if (ignoredFields.has(key)) return

      result.set(key, value)
    })

    return result
  }

  upcoming.forEach((value, key) => {
    result.set(key, value)
  })

  return result
}

module.exports = hashAtom

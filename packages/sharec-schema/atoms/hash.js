// @ts-check

const isEqual = require('lodash/isEqual')
const { pickBy, omitBy } = require('sharec-utils').map

/**
 * @typedef {import('types/Schema').SchemaHashParam} SchemaHashParam
 * @typedef {import('types/Schema').SchemaHashParams} SchemaHashParams
 */

/**
 * Merges objects preseted as maps
 * @param {SchemaHashParams} params
 * @returns {SchemaHashParam}
 */
function hashAtom({ current, upcoming, cached }) {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming

  const result = new Map(current)

  if (cached === undefined) {
    upcoming.forEach((value, key) => {
      result.set(key, value)
    })

    return result
  }

  const removedFields = pickBy(cached, (value, key) => value !== undefined && current.get(key) === undefined)
  const ignoredFields = omitBy(current, (value, key) => {
    if (!cached.has(key)) return true
    if (isEqual(cached.get(key), value)) return true

    return false
  })

  upcoming.forEach((value, key) => {
    if (removedFields.has(key) || ignoredFields.has(key)) return

    result.set(key, value)
  })

  return result
}

module.exports = hashAtom

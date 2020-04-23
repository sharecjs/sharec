const without = require('lodash/without')

const applySchemaByKeys = ({ schema, keys = [], target }) => params => {
  if (keys.length === 0) return target

  const { current, upcoming, cached } = params

  for (const key of keys) {
    const strategy = schema[key] || schema.$$default
    const ignoreList = schema.$$ignore || []

    if (!strategy || !upcoming.has(key) || ignoreList.includes(key)) {
      target.set(key, current.get(key))
      continue
    }

    target.set(
      key,
      strategy({
        current: current.get(key),
        upcoming: upcoming.get(key),
        cached: cached && cached.get(key),
        ignore: schema.$$ignore,
      }),
    )
  }

  return target
}

/**
 * @param {Object} schema
 * @returns {Function}
 */
const compose = schema =>
  /**
   * @param {Object} params
   * @param {Object} options
   * @param {Boolean} [options.overwrite]
   * @returns {Object}
   */
  params => {
    const { current, upcoming } = params

    if (upcoming === undefined) return current
    if (current === undefined) return upcoming
    if (typeof current !== typeof upcoming) return upcoming
    if (Array.isArray(schema)) return schema[0](params)

    let result = new Map()

    const currentKeys = Array.from(current.keys())
    const upcomingKeys = Array.from(upcoming.keys())

    const newKeys = without(upcomingKeys, ...currentKeys)

    applySchemaByKeys({ schema, keys: currentKeys, target: result })(params)
    applySchemaByKeys({ schema, keys: newKeys, target: result })(params)

    return result
  }

module.exports = compose

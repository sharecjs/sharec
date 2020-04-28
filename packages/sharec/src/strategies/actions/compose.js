const without = require('lodash/without')

const applySchemaByKeys = ({ schema, keys = [], target }) => params => {
  if (keys.length === 0) return target

  for (const key of keys) {
    const strategy = schema[key] || schema.$$default
    const ignoreList = schema.$$ignore || []

    if (!strategy || !params.upcoming.has(key) || ignoreList.includes(key)) {
      target.set(key, params.current.get(key))
      continue
    }

    const current = params.current.get(key)
    const upcoming = params.upcoming.get(key)
    const cached = params.cached && params.cached.get(key)

    if (current === undefined && cached !== undefined) {
      continue
    }

    target.set(
      key,
      strategy({
        ignore: schema.$$ignore,
        current,
        upcoming,
        cached,
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

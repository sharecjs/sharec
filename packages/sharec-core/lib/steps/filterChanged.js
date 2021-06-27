// @ts-check
const { join } = require('sharec-utils').path

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const filterChanged = async (input) => {
  const { targetPath, configs, local, cache } = input

  if (!cache) return input

  const newConfigs = { ...configs }

  for (const cachedConfigKey in cache) {
    const localConfigKey = join(targetPath, cachedConfigKey)
    const localConfig = local[localConfigKey]
    const cachedConfig = cache[cachedConfigKey]

    if (localConfig === cachedConfig) continue

    delete newConfigs[cachedConfigKey]
  }

  input.configs = newConfigs

  return input
}

module.exports = filterChanged

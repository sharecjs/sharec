// @ts-check
const { readFile } = require('sharec-utils').std
const { join } = require('sharec-utils').path

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const readLocalConfigs = async (input) => {
  const { targetPath, configs } = input
  const localConfigs = {}

  for (const configKey in configs) {
    const localConfigKey = join(targetPath, configKey)

    try {
      const localConfig = await readFile(localConfigKey, 'utf8')

      localConfigs[configKey] = localConfig
    } catch (err) {}
  }

  input.local = localConfigs

  return input
}

module.exports = readLocalConfigs

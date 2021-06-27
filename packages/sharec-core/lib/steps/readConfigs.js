// @ts-check
const { readFile } = require('sharec-utils').std
const { join } = require('sharec-utils').path
const { find } = require('sharec-utils').fs
const { InternalError, errorCauses } = require('../errors')

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const readConfigs = async (input) => {
  const configsPath = join(input.configPath, '/configs')

  try {
    const configsPaths = await find(configsPath, '**/*')
    const withoutLocks = configsPaths.filter((config) => !/(\.|-)lock/.test(config))
    const readedConfigs = {}

    for (const config of withoutLocks) {
      const configKey = config.replace(configsPath, '').replace(/^\//, '')

      readedConfigs[configKey] = await readFile(config, 'utf8')
    }

    input.configs = readedConfigs

    return input
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }

    if (err.message.includes('readdir')) {
      throw new InternalError(errorCauses.CONFIGS_NOT_FOUND.message(configsPath), errorCauses.CONFIGS_NOT_FOUND.symbol)
    }

    throw err
  }
}

module.exports = readConfigs

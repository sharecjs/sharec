// @ts-check
const { readFile } = require('sharec-utils').std
const { join } = require('sharec-utils').path
const { find } = require('sharec-utils').fs
const { InternalError, errorCauses } = require('../errors')
const binaryExtensions = require('binary-extensions')

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

    const withoutBinaries = []

    for (const file of withoutLocks) {
      const match = /.+\.([a-zA-Z0-9]+)$/.exec(file)

      if (match && binaryExtensions.includes(match[1])) {
        input.binaries.push({
          filename: file.replace(configsPath, '').replace(/^\//, ''),
          original: file
        });
      } else {
        withoutBinaries.push(file)
      }
    }

    const readedConfigs = {}

    for (const config of withoutBinaries) {
      const configKey = config.replace(configsPath, '').replace(/^\//, '')
      const data = await readFile(config, 'utf8')

      if (data.startsWith('#!')) {
        input.binaries.push({
          filename: configKey,
          original: config
        });
      } else {
        readedConfigs[configKey] = data
      }
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

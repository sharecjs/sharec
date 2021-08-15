// @ts-check
const { copyFile } = require('sharec-utils').std
const { dirname, join } = require('sharec-utils').path
const { find, safeMakeDir } = require('sharec-utils').fs
const { InternalError, errorCauses } = require('../errors')

/**
 * @typedef {import('..').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const copyBinaries = async (input) => {
  const { targetPath, configs } = input
  const configsPath = join(input.configPath, '/configs')

  try {
    const configsPaths = await find(configsPath, '**/*')
    const withoutLocks = configsPaths.filter((config) => !/(\.|-)lock/.test(config))
    const directories = {}

    for (const config of withoutLocks) {
      const configKey = config.replace(configsPath, '').replace(/^\//, '')

      if (!configs[configKey]) {
        const target = join(targetPath, configKey)
        const directory = dirname(target)

        if (directories[directory]) {
          directories[directory].push([config, target])
        } else {
          directories[directory] = [[config, target]]
        }
      }
    }

    for (const [directory, files] of Object.entries(directories)) {
      await safeMakeDir(directory)

      for (const [original, target] of files) {
        await copyFile(original, target)
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }

    if (err.message.includes('readdir')) {
      throw new InternalError(errorCauses.CONFIGS_NOT_FOUND.message(configsPath), errorCauses.CONFIGS_NOT_FOUND.symbol)
    }

    throw err
  }

  return input
}

module.exports = copyBinaries

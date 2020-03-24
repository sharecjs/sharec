const path = require('path')
const { readFile, readDir } = require('../utils/std').fs
const { find } = require('../utils/fs')
const { InternalError, CAUSES } = require('../errors')

const readConfigs = input => {
  const configsPath = path.join(input.configPath, '/configs')

  return find(configsPath, '**/*')
    .then(configsPaths => {
      const withoutLocks = configsPaths.filter(
        config => !/(\.|-)lock/.test(config),
      )

      return withoutLocks
    })
    .then(async configsPaths => {
      let readedConfigs = {}

      for (const config of configsPaths) {
        const configContent = await readFile(config, 'utf8')

        readedConfigs[config] = configContent
      }

      return readedConfigs
    })
    .then(readedConfigs => ({
      ...input,
      configs: readedConfigs,
    }))
    .catch(err => {
      if (err.code !== 'ENOENT') throw err
      if (err.message.includes('readdir')) {
        throw new InternalError(
          CAUSES.CONFIGS_NOT_FOUND.message(configsPath),
          CAUSES.CONFIGS_NOT_FOUND.symbol,
        )
      }

      throw err
    })
}

module.exports = readConfigs

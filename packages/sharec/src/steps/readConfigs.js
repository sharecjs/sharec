const path = require('path')
const { readFile } = require('../utils/std').fs
const { find } = require('../utils/fs')
const { InternalError, CAUSES } = require('../errors')

const readConfigs = spinner => input => {
  spinner.frame('Reading upcoming configuration files')

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
        spinner.frame(`Reading ${config}`)

        const configContent = await readFile(config, 'utf8')
        const configBasePath = config.replace(configsPath, '')

        readedConfigs[configBasePath] = configContent
      }

      return readedConfigs
    })
    .then(readedConfigs => {
      spinner.succeed('All files were readed')

      return {
        ...input,
        configs: readedConfigs,
      }
    })
    .catch(err => {
      if (err.code !== 'ENOENT') {
        spinner.fail('Config files were not readed due unexpected error')

        throw err
      }
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

const { readFile } = require('../utils/std').fs
const { join } = require('../utils/std').path
const { find } = require('../utils/fs')
const { InternalError, CAUSES } = require('../errors')

const readConfigs = (spinner) => async (input) => {
  spinner.frame('reading upcoming configuration files')

  const configsPath = join(input.configPath, '/configs')

  try {
    const configsPaths = await find(configsPath, '**/*')
    const withoutLocks = configsPaths.filter((config) => !/(\.|-)lock/.test(config))
    const readedConfigs = {}

    for (const config of withoutLocks) {
      spinner.frame(`reading ${config}`)

      const configKey = config.replace(configsPath, '').replace(/^\//, '')

      readedConfigs[configKey] = await readFile(config, 'utf8')
    }

    spinner.frame('all files were readed')

    input.configs = readedConfigs

    return input
  } catch (err) {
    if (err.code !== 'ENOENT') {
      spinner.fail('Config files were not readed due unexpected error')

      throw err
    }

    if (err.message.includes('readdir')) {
      throw new InternalError(CAUSES.CONFIGS_NOT_FOUND.message(configsPath), CAUSES.CONFIGS_NOT_FOUND.symbol)
    }

    throw err
  }
}

module.exports = readConfigs

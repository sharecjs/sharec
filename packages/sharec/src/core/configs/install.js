const chalk = require('chalk')
const path = require('path')
const { readFile, writeFile } = require('../../utils/std').fs
const { safeMakeDir } = require('../../utils/fs')
const { resolveConfigStrategy } = require('../strategies/resolve')

/**
 * @param {String} options.targetPath
 * @param {String} options.configPath
 * @param {String} options.configSource
 * @param {String} [options.configCache]
 * @returns {Promise<void>}
 */
const installConfig = async ({
  targetPath,
  configPath,
  configSource,
  configCache,
}) => {
  const targetStrategy = resolveConfigStrategy(configPath)
  const localConfigPath = path.join(targetPath, configPath)
  const localConfigDirName = path.dirname(localConfigPath)
  let newConfig = null
  let localConfig = null

  try {
    localConfig = await readFile(localConfigPath, 'utf8')
  } catch (err) {}

  if (localConfig && targetStrategy) {
    try {
      newConfig = targetStrategy.merge(configPath)({
        current: localConfig,
        upcoming: configSource,
        cache: configCache,
      })
    } catch (err) {
      const errorMessage = [
        chalk.bold(
          `sharec: an error occured during merging ${localConfigPath}`,
        ),
        err.message,
      ]

      console.error(errorMessage.join('\n\t'))
    }
  } else {
    newConfig = configSource
  }

  await safeMakeDir(localConfigDirName)
  await writeFile(
    localConfigPath,
    newConfig instanceof Object
      ? JSON.stringify(newConfig, null, 2)
      : newConfig,
    'utf8',
  )
}

module.exports = {
  installConfig,
}

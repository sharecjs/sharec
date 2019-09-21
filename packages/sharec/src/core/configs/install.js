const chalk = require('chalk')
const path = require('path')
const { readFile, writeFile } = require('../../utils/std').fs
const { safeMakeDir } = require('../../utils/fs')
const { cacheConfig, loadConfigCache } = require('../cache')
const { resolveConfigStrategy } = require('../strategies/resolve')

const installConfig = async ({
  targetPath,
  configsPath,
  configPath,
  installedMeta,
  upcomingMeta,
  overwrite,
}) => {
  const localConfigPath = path.join(targetPath, configPath)
  const localConfigDirName = path.dirname(localConfigPath)
  const upcomingConfigPath = path.join(configsPath, configPath)
  const upcomingConfig = await readFile(upcomingConfigPath, 'utf8')

  if (overwrite) {
    await writeFile(localConfigPath, upcomingConfig, 'utf8')
    return
  }

  const configCache = installedMeta
    ? await loadConfigCache({
        configsMeta: installedMeta,
        configPath,
        targetPath,
      })
    : null
  const targetStrategy = resolveConfigStrategy(configPath)
  let newConfig = null
  let localConfig = null

  try {
    localConfig = await readFile(localConfigPath, 'utf8')
  } catch (err) {}

  if (localConfig && targetStrategy) {
    try {
      newConfig = targetStrategy.merge(configPath)({
        current: localConfig,
        upcoming: upcomingConfig,
        cached: configCache,
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
    newConfig = upcomingConfig
  }

  await safeMakeDir(localConfigDirName)
  await writeFile(
    localConfigPath,
    newConfig instanceof Object
      ? JSON.stringify(newConfig, null, 2)
      : newConfig,
    'utf8',
  )
  await cacheConfig({
    configsMeta: upcomingMeta,
    configSource: upcomingConfig,
    configPath,
    targetPath,
  })
}

module.exports = {
  installConfig,
}

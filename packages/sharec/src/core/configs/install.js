const chalk = require('chalk')
const path = require('path')
const { readFile, writeFile } = require('../../utils/std').fs
const { safeReadFile, safeMakeDir } = require('../../utils/fs')
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
  // TODO: refactor this
  const targetStrategy = resolveConfigStrategy(configPath)
  const targetConfigBasePath = path.dirname(configPath)
  const targetConfigFilename = targetStrategy
    ? targetStrategy.getAliasedFileName(path.basename(configPath))
    : path.basename(configPath)
  const newConfigPath = path.join(
    targetPath,
    targetConfigBasePath,
    targetConfigFilename,
  )
  const upcomingConfigPath = path.join(configsPath, configPath)
  const upcomingConfig = await readFile(upcomingConfigPath, 'utf8')
  const localConfig = await safeReadFile(newConfigPath)

  await safeMakeDir(path.dirname(newConfigPath))

  if (!targetStrategy || !localConfig) {
    await writeFile(newConfigPath, upcomingConfig, 'utf8')
    await cacheConfig({
      configsMeta: upcomingMeta,
      configSource: upcomingConfig,
      configPath,
      targetPath,
    })
    return
  }

  if (overwrite) {
    await writeFile(newConfigPath, upcomingConfig, 'utf8')
    return
  }

  const configCache = installedMeta
    ? await loadConfigCache({
        configsMeta: installedMeta,
        configPath,
        targetPath,
      })
    : null

  try {
    const newConfig = targetStrategy.merge(configPath)({
      current: localConfig,
      upcoming: upcomingConfig,
      cached: configCache,
    })
    await writeFile(
      newConfigPath,
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
  } catch (err) {
    const errorMessage = [
      chalk.bold(`sharec: an error occured during merging ${newConfigPath}`),
      err.message,
    ]

    console.error(errorMessage.join('\n\t'))
  }
}

module.exports = {
  installConfig,
}

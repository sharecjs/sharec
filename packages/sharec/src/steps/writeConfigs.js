const { getConfigPipe } = require('../strategies/pipes')
const { writeFile, readFile } = require('../utils/std').fs
const { join, dirname, basename } = require('../utils/std').path
const { safeMakeDir } = require('../utils/fs')

const writeConfigs = spinner => async input => {
  const { configs, cache = {}, targetPath, options } = input
  const { overwrite } = options

  spinner.frame('writing configuration')

  for (const config in configs) {
    const upcomingConfig = configs[config]

    if (!upcomingConfig) continue

    let currentConfig
    let targetConfigPath = join(targetPath, config)
    const targetConfigBasename = basename(config)
    const isPackageJson = targetConfigBasename === 'package.json'
    const isOverwritePackageJson = isPackageJson && overwrite
    const targetPipe = getConfigPipe(targetConfigPath)

    if (targetPipe && targetPipe.alias) {
      targetConfigPath = join(dirname(targetConfigPath), targetPipe.alias)
    }

    // creating target directories to avoid ENOENT errors
    await safeMakeDir(dirname(targetConfigPath))

    if (!targetPipe) {
      await writeFile(targetConfigPath, upcomingConfig)
      continue
    }

    // package.json can't be overwrited
    if (overwrite && !isPackageJson) {
      await writeFile(targetConfigPath, upcomingConfig)
      continue
    }

    try {
      currentConfig = await readFile(targetConfigPath, 'utf8')
    } catch (err) {}

    const cachedConfig = !isOverwritePackageJson ? cache[config] : undefined

    // skip config if it was fully removed by user
    if (!currentConfig && cachedConfig) {
      continue
    }

    const mergedConfig = targetPipe.processor({
      current: currentConfig,
      upcoming: upcomingConfig,
      cached: cachedConfig,
    })

    await writeFile(targetConfigPath, mergedConfig)
  }

  spinner.frame('configuration was writed')

  return input
}

module.exports = writeConfigs

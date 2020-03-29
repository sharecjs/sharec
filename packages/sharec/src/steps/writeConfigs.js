const path = require('path')
const { getConfigPipe } = require('../strategies/pipes')
const { writeFile, readFile } = require('../utils/std').fs
const { safeMakeDir } = require('../utils/fs')

const writeConfigs = spinner => async input => {
  const { configs, cache = {}, targetPath, options } = input
  const { overwrite } = options

  spinner.frame('writing configuration')

  for (const config in configs) {
    const targetConfigPath = path.join(targetPath, config)
    const targetConfigBasename = path.basename(config)
    const isPackageJson = targetConfigBasename === 'package.json'
    const isOverwritePackageJson = isPackageJson && overwrite
    const targetPipe = getConfigPipe(targetConfigPath)
    const upcomingConfig = configs[config]

    if (!upcomingConfig) continue
    if (!targetPipe || (overwrite && !isPackageJson)) {
      await writeFile(targetConfigPath, upcomingConfig)
      continue
    }

    const { processor } = targetPipe
    const cachedConfig = !isOverwritePackageJson ? cache[config] : undefined
    let currentConfig

    try {
      currentConfig = await readFile(targetConfigPath, 'utf8')
    } catch (err) {
      await safeMakeDir(path.dirname(targetConfigPath))
    }

    const mergedConfig = processor({
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

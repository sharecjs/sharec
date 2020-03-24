const get = require('lodash/get')
const path = require('path')
const { getConfigPipe } = require('../strategies/pipes')
const { writeFile, readFile } = require('../utils/std').fs
const { safeMakeDir } = require('../utils/fs')

const writeConfigs = async input => {
  const { configs, cache, targetPath } = input

  for (const config in configs) {
    const configPath = path.join(targetPath, config)
    const targetPipe = getConfigPipe(configPath)
    const upcomingConfig = configs[config]

    if (!upcomingConfig) continue
    if (!targetPipe) {
      await writeFile(configPath, upcomingConfig)
      continue
    }

    const cachedConfig = get(cache, config, undefined)
    let currentConfig

    try {
      currentConfig = await readFile(configPath, 'utf8')
    } catch (err) {
      await safeMakeDir(path.dirname(configPath))
    }

    const mergedConfig = targetPipe({
      current: currentConfig,
      upcoming: upcomingConfig,
      cache: cachedConfig,
    })

    await writeFile(configPath, mergedConfig)
  }

  return input
}

module.exports = writeConfigs

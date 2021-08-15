// @ts-check
const get = require('lodash/get')
const { readFile } = require('sharec-utils').std
const { join, dirname, basename } = require('sharec-utils').path
const { getConfigPipe } = require('../pipes')

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const mergeConfigs = async (input) => {
  const { configs, cache = {}, sharecConfig = {}, targetPath, options, configModes } = input
  const { overwrite } = options

  for (const configKey in configs) {
    const upcomingConfig = configs[configKey]

    if (!upcomingConfig) continue

    let currentConfig
    let targetConfigPath = join(targetPath, configKey)

    const targetConfigBasename = basename(configKey)
    const configParams = get(sharecConfig, `configs['${configKey}']`, {})
    const isPackageJson = targetConfigBasename === 'package.json'
    const isOverwriteMode = overwrite || configParams.overwrite
    const isOverwritePackageJson = isPackageJson && isOverwriteMode
    const targetPipe = getConfigPipe(targetConfigPath)

    if (targetPipe && targetPipe.alias) {
      targetConfigPath = join(dirname(targetConfigPath), targetPipe.alias)
    }

    if (configModes[configKey]) {
      configModes[targetConfigPath] = configModes[configKey]
    }

    try {
      currentConfig = await readFile(targetConfigPath, 'utf8')
    } catch (err) {}

    const cachedConfig = !isOverwritePackageJson ? cache[configKey] : undefined

    // current file was changed by user
    if (!targetPipe && cachedConfig !== currentConfig) {
      continue
    }

    if (!targetPipe) {
      input.mergedConfigs[targetConfigPath] = upcomingConfig
      continue
    }

    // package.json can't be overwrited
    if (isOverwriteMode && !isPackageJson) {
      input.mergedConfigs[targetConfigPath] = upcomingConfig
      continue
    }

    const mergedConfig = targetPipe.processor({
      current: currentConfig,
      upcoming: upcomingConfig,
      cached: cachedConfig,
    })

    input.mergedConfigs[targetConfigPath] = mergedConfig
  }

  return input
}

module.exports = mergeConfigs

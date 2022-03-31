// @ts-check
const get = require('lodash/get')
const { readFile } = require('sharec-utils').std
const { join } = require('sharec-utils').path
const { getConfigPipe } = require('../pipes')

/**
 * @typedef {import('../').FlowContext} FlowContext
 */

/**
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
const mergeConfigsPackages = async (context) => {
  let nextConfig = false
  const { configs, cache = {}, targetPath, targetPackage } = context

  for (const configPackage of configs) {
    const lockedConfigVersion = get(targetPackage, `sharec.locked.${configPackage}`)

    if (lockedConfigVersion === configPackage.version) continue

    for (const config in configPackage.configs) {
      let currentConfig
      const targetConfigPath = join(targetPath, config)
      const targetPipe = getConfigPipe(targetConfigPath)
      const cachedConfig = cache[config]

      if (!nextConfig) {
        try {
          currentConfig = await readFile(targetConfigPath, 'utf8')
        } catch (err) {}
      } else {
        currentConfig = context.mergedConfigs[targetConfigPath]
      }

      // skip config if it was entirely deleted by user
      if (!currentConfig && cachedConfig) continue

      // the file was changed by user
      if (!targetPipe && cachedConfig !== currentConfig) continue

      // when config doesn't have specific strategy – we should just replace it by upcoming one
      if (!targetPipe) {
        context.mergedConfigs[targetConfigPath] = configPackage.configs[config]
        continue
      }

      context.mergedConfigs[targetConfigPath] = targetPipe.processor({
        current: currentConfig,
        upcoming: configPackage.configs[config],
        cached: cachedConfig,
      })
    }

    nextConfig = true
  }

  return context
}

module.exports = mergeConfigsPackages

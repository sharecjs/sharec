// @ts-check
const get = require('lodash/get')
const { readFile } = require('sharec-utils').std
const { join } = require('sharec-utils').path
const { getConfigPipe } = require('../pipes')

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').Semaphore} Semaphore
 */

/**
 * @param {FlowContext} context
 * @param {Semaphore} semaphore
 * @returns {Promise<FlowContext>}
 */
const mergeConfigsPackages = async (context, semaphore) => {
  let nextConfig = false
  const { configs, cache = {}, targetPath, targetPackage } = context

  for (const configPackage of configs) {
    const lockedConfigVersion = get(targetPackage, `sharec.locked[${configPackage.name}]`)

    semaphore.start(`Installing ${configPackage.name}@${configPackage.version}`)

    if (lockedConfigVersion === configPackage.version) {
      semaphore.success(`${configPackage.name}@${configPackage.version} already has been installed`)
      continue
    }

    for (const config in configPackage.configs) {
      let currentConfig
      const targetConfigPath = join(targetPath, config)
      const targetPipe = getConfigPipe(targetConfigPath)
      const cachedConfig = cache[config]

      // when first config has been applied, we don't need to read target file one more time
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

    semaphore.success(`Package ${configPackage.name}@${configPackage.version} has been merged`)

    nextConfig = true
  }

  return context
}

module.exports = mergeConfigsPackages

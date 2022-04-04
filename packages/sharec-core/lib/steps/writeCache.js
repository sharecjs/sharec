// @ts-check
const { writeFile, removeFile } = require('sharec-utils').std
const { join, dirname } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').Semaphore} Semaphore
 */

/**
 * @param {FlowContext} context
 * @param {Semaphore} semaphore
 * @returns {Promise<FlowContext>}
 */
const writeCache = async (context, semaphore) => {
  const { mergedConfigs, targetPath, options } = context

  if (!options.cache) return context

  semaphore.start('Saving cache')

  const cachePath = options.cache === 'include'
    ? join(targetPath, '.sharec/cache')
    : join(targetPath, 'node_modules/.cache/sharec')

  for (const config in mergedConfigs) {
    const configPath = config.replace(new RegExp(`^${targetPath}`), '')
    const configCachePath = join(cachePath, configPath)

    await safeMakeDir(dirname(configCachePath))

    // invalidate previous cache
    try {
      await removeFile(configCachePath)
    } catch (err) {}

    await writeFile(configCachePath, mergedConfigs[config])
  }

  semaphore.success('Cache has been saved')

  return context
}

module.exports = writeCache

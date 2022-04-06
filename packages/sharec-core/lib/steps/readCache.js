// @ts-check
const { readFile } = require('sharec-utils').std
const { join } = require('sharec-utils').path
const { find } = require('sharec-utils').fs

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').Semaphore} Semaphore
 */

/**
 * @param {FlowContext} context
 * @param {Semaphore} semaphore
 * @returns {Promise<FlowContext>}
 */
const readCache = async (context, semaphore) => {
  const { targetPath, options } = context

  if (!options.cache) return context

  const cachePath = options.cache === 'include'
    ? join(targetPath, '.sharec/cache')
    : join(targetPath, 'node_modules/.cache/sharec')

  semaphore.start('Reading cache')

  try {
    const cachedFiles = await find(cachePath, '**/*')

    if (cachedFiles.length === 0) {
      semaphore.success("There isn't cache")
      return context
    }

    for (const configPath of cachedFiles) {
      const configKey = configPath.replace(cachePath, '').replace(/^\//, '')

      context.cache[configKey] = await readFile(configPath, 'utf8')
    }

    semaphore.start('Cache has been loaded')

    return context
  } catch (err) {
    semaphore.error("Cache hasn't been loaded")

    return context
  }
}

module.exports = readCache

// @ts-check
const { readFile } = require('sharec-utils').std
const { join } = require('sharec-utils').path
const { find } = require('sharec-utils').fs

/**
 * @typedef {import('../').FlowContext} FlowContext
 */

/**
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
const readCache = async (context) => {
  const { targetPath, options } = context

  if (!options.cache) return context

  const cachePath = options.cache === 'include'
    ? join(targetPath, '.sharec/cache')
    : join(targetPath, 'node_modules/.cache/sharec')

  try {
    const cachedFiles = await find(cachePath, '**/*')

    if (cachedFiles.length === 0) return context

    for (const configPath of cachedFiles) {
      const configKey = configPath.replace(cachePath, '').replace(/^\//, '')

      context.cache[configKey] = await readFile(configPath, 'utf8')
    }

    return context
  } catch (err) {
    return context
  }
}

module.exports = readCache

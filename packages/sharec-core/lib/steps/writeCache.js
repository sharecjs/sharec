// @ts-check
const { writeFile } = require('sharec-utils').std
const { join, dirname } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').FlowContext} FlowContext
 */

/**
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
const writeCache = async (context) => {
  const { mergedConfigs, targetPath, options } = context

  if (!options.cache) return context

  const cachePath = options.cache === 'include'
    ? join(targetPath, '.sharec/cache')
    : join(targetPath, 'node_modules/.cache/sharec')

  await safeMakeDir(cachePath)

  for (const config in mergedConfigs) {
    await safeMakeDir(join(cachePath, dirname(config)))
    await writeFile(join(cachePath, config), mergedConfigs[config])
  }

  return context
}

module.exports = writeCache

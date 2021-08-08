// @ts-check
const get = require('lodash/get')
const { readFile } = require('sharec-utils').std
const { join } = require('sharec-utils').path
const { find } = require('sharec-utils').fs

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const readCache = async (input) => {
  const { targetPackage, targetPath } = input
  const previousTargetMeta = get(targetPackage, 'sharec', null)

  if (!previousTargetMeta) return input

  const { includeCache } = input.options
  const { config, version } = previousTargetMeta
  let cachePath = includeCache ? join(targetPath, '.sharec/.cache') : join(targetPath, 'node_modules/.cache/sharec')

  cachePath = join(cachePath, `${config}/${version}`)

  try {
    const cachedFiles = await find(cachePath, '**/*')

    if (cachedFiles.length === 0) return input

    for (const configPath of cachedFiles) {
      const configKey = configPath.replace(cachePath, '').replace(/^\//, '')
      const cachedConfig = await readFile(configPath, 'utf8')

      input.cache[configKey] = cachedConfig
    }

    return input
  } catch (err) {
    if (err.message.includes('ENOENT')) {
      return input
    }

    throw err
  }
}

module.exports = readCache

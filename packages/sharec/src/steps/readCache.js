// @ts-check
const get = require('lodash/get')
const { fs } = require('sharec-utils').std
const { join } = require('sharec-utils').path
const { find } = require('sharec-utils').fs

/**
 * @typedef {import('../').Input} Input
 */

const readCache = ({ spinner, prompt }) =>
  /**
   * @param {Input} input
   * @returns {Promise<Input>}
   */
  async (input) => {
    const { targetPackage, targetPath } = input
    const previousTargetMeta = get(targetPackage, 'sharec', null)

    if (!previousTargetMeta) return input

    const { includeCache } = input.options
    const { config, version } = previousTargetMeta
    let cachePath = includeCache ? join(targetPath, '.sharec/.cache') : join(targetPath, 'node_modules/.cache/sharec')

    cachePath = join(cachePath, `${config}/${version}`)

    spinner.frame(`reading cache for ${config}/${version}`)

    return find(cachePath, '**/*')
      .then(async (cachedFiles) => {
        if (cachedFiles.length === 0) return input

        for (const configPath of cachedFiles) {
          const configKey = configPath.replace(cachePath, '').replace(/^\//, '')
          const cachedConfig = await fs.readFile(configPath, 'utf8')

          input.cache[configKey] = cachedConfig
        }

        spinner.frame('cache was readed')

        return input
      })
      .catch((err) => {
        if (err.message.includes('ENOENT')) {
          spinner.frame('cache was not found, skipping')

          return input
        }

        spinner.fail('Cache was not readed due unexpected error')

        throw err
      })
  }

module.exports = readCache

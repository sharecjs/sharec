// @ts-check
const { writeFile } = require('sharec-utils').std
const { join, dirname } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').StepWrapperPayload} StepWrapperPayload
 * @typedef {import('../').Input} Input
 */

/**
 * @param {StepWrapperPayload} [payload]
 * @returns {Function}
 */
const writeCache = ({ spinner }) =>
  /**
   * @param {Input} input
   * @returns {Promise<Input>}
   */
  async (input) => {
    const { upcomingPackage, configs, targetPath, options } = input
    const { name, version } = upcomingPackage
    const { disappear, overwrite, includeCache } = options

    if (disappear || overwrite) return input

    spinner.frame(`writing cache for ${name}/${version}`)

    let cachePath = includeCache ? join(targetPath, '.sharec/.cache') : join(targetPath, 'node_modules/.cache/sharec')

    cachePath = join(cachePath, `${name}/${version}`)

    await safeMakeDir(cachePath)

    for (const config in configs) {
      await safeMakeDir(join(cachePath, dirname(config)))
      await writeFile(join(cachePath, config), configs[config])
    }

    spinner.frame(`configuration for ${name}/${version} was cached`)

    return input
  }

module.exports = writeCache

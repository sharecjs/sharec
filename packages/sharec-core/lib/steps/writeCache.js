// @ts-check
const { writeFile } = require('sharec-utils').std
const { join, dirname } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const writeCache = async (input) => {
  const { upcomingPackage, configs, targetPath, options } = input
  const { name, version } = upcomingPackage
  const { disappear, overwrite, includeCache } = options

  if (disappear || overwrite) return input

  let cachePath = includeCache ? join(targetPath, '.sharec/.cache') : join(targetPath, 'node_modules/.cache/sharec')

  cachePath = join(cachePath, `${name}/${version}`)

  await safeMakeDir(cachePath)

  for (const config in configs) {
    await safeMakeDir(join(cachePath, dirname(config)))
    await writeFile(join(cachePath, config), configs[config])
  }

  return input
}

module.exports = writeCache

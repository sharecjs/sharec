// @ts-check
const { join } = require('sharec-utils').path

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const insertMeta = async (input) => {
  const { options, mergedConfigs } = input
  const { disappear, overwrite } = options

  if (disappear || overwrite) return input

  const { name, version } = input.upcomingPackage
  const targetPackagePath = join(input.targetPath, 'package.json')
  const targetPackage = mergedConfigs[targetPackagePath]
    ? JSON.parse(mergedConfigs[targetPackagePath])
    : input.targetPackage

  targetPackage.sharec = {
    config: name,
    version,
  }

  input.mergedConfigs[targetPackagePath] = JSON.stringify(targetPackage, null, 2)

  return input
}

module.exports = insertMeta

// @ts-check
const { join } = require('sharec-utils').path

/**
 * @typedef {import('../').StepWrapperPayload} StepWrapperPayload
 * @typedef {import('../').Input} Input
 */

/**
 * @param {StepWrapperPayload} [payload]
 * @returns {Function}
 */
const insertMeta = ({ spinner }) =>
  /**
   * @param {Input} input
   * @returns {Promise<Input>}
   */
  async (input) => {
    const { options, mergedConfigs } = input
    const { disappear, overwrite } = options

    if (disappear || overwrite) return input

    spinner.frame('inserting sharec meta data')

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

    spinner.frame('sharec meta data was inserted')

    return input
  }

module.exports = insertMeta

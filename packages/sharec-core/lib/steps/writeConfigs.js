// @ts-check
const { writeFile, chmod } = require('sharec-utils').std
const { dirname } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const writeConfigs = async (input) => {
  const { mergedConfigs, configModes } = input

  for (const config in mergedConfigs) {
    await safeMakeDir(dirname(config))
    await writeFile(config, mergedConfigs[config])

    if (configModes[config]) {
      await chmod(config, configModes[config])
    }
  }

  return input
}

module.exports = writeConfigs

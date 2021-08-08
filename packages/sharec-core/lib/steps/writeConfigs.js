// @ts-check
const { writeFile } = require('sharec-utils').std
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
  const { mergedConfigs } = input

  for (const config in mergedConfigs) {
    await safeMakeDir(dirname(config))
    await writeFile(config, mergedConfigs[config])
  }

  return input
}

module.exports = writeConfigs

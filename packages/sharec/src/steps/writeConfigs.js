// @ts-check
const { writeFile } = require('sharec-utils').std
const { dirname } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').StepWrapperPayload} StepWrapperPayload
 * @typedef {import('../').Input} Input
 */

/**
 * @param {StepWrapperPayload} [payload]
 * @returns {Function}
 */
const writeConfigs = ({ spinner }) =>
  /**
   * @param {Input} input
   * @returns {Promise<Input>}
   */
  async (input) => {
    const { mergedConfigs } = input

    spinner.frame('writing configuration')

    for (const config in mergedConfigs) {
      await safeMakeDir(dirname(config))
      await writeFile(config, mergedConfigs[config])
    }

    spinner.frame('configuration was writed')

    return input
  }

module.exports = writeConfigs

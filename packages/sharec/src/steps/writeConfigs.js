// @ts-check
const { fs } = require('sharec-utils').std
const { dirname } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').Input} Input
 */

const writeConfigs = ({ spinner, prompt }) =>
  /**
   * @param {Input} input
   * @returns {Promise<Input>}
   */
  async (input) => {
    const { mergedConfigs } = input

    spinner.frame('writing configuration')

    for (const config in mergedConfigs) {
      await safeMakeDir(dirname(config))
      await fs.writeFile(config, mergedConfigs[config])
    }

    spinner.frame('configuration was writed')

    return input
  }

module.exports = writeConfigs

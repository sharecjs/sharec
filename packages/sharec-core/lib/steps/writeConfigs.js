// @ts-check
const { writeFile } = require('sharec-utils').std
const { dirname } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').FlowContext} FlowContext
 */

/**
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
const writeConfigs = async (context) => {
  const { mergedConfigs } = context

  for (const config in mergedConfigs) {
    await safeMakeDir(dirname(config))
    await writeFile(config, mergedConfigs[config])
  }

  return context
}

module.exports = writeConfigs

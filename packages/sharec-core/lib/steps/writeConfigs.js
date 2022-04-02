// @ts-check
const { EOL } = require('os')
const { writeFile } = require('sharec-utils').std
const { dirname } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').FlowContext} FlowContext
 */

const eolRegexp = new RegExp(`${EOL}$`)

/**
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
const writeConfigs = async (context) => {
  const { mergedConfigs } = context

  for (const config in mergedConfigs) {
    const configContent = mergedConfigs[config]

    await safeMakeDir(dirname(config))

    // FIXME: temp solution, then need to create additional middleware for this
    if (eolRegexp.test(configContent)) {
      await writeFile(config, configContent)
    } else {
      await writeFile(config, `${configContent}${EOL}`)
    }
  }

  return context
}

module.exports = writeConfigs

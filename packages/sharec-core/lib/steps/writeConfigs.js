// @ts-check
const { EOL } = require('os')
const { writeFile } = require('sharec-utils').std
const { dirname } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').Semaphore} Semaphore
 */

const eolRegexp = new RegExp(`${EOL}$`)

/**
 * @param {FlowContext} context
 * @param {Semaphore} semaphore
 * @returns {Promise<FlowContext>}
 */
const writeConfigs = async (context, semaphore) => {
  semaphore.start('Saving merged configs')

  const { mergedConfigs } = context

  if (Object.keys(mergedConfigs).length === 0) {
    semaphore.success("There isn't any updated config to write")

    return context
  }

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

  semaphore.success('Merged configs have been saved')

  return context
}

module.exports = writeConfigs

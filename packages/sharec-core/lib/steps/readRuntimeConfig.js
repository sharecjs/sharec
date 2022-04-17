// @ts-check
const { stat } = require('sharec-utils').std
const { join } = require('sharec-utils').path

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').Semaphore} Semaphore
 */

/**
 * TODO: don't know how to cover the function with unit-tests
 * `require` can't work inside `memfs`
 * @param {FlowContext} context
 * @param {Semaphore} semaphore
 * @returns {Promise<FlowContext>}
 */
const readRuntimeConfig = async (context, semaphore) => {
  const { targetPath } = context
  const runtimeConfigPath = join(targetPath, '.sharecrc.js')

  try {
    semaphore.start('Loading runtime configuration')

    await stat(runtimeConfigPath)
  } catch (err) {
    semaphore.warn('No runtime configuration found')

    return context
  }

  context.runtimeConfig = require(runtimeConfigPath)

  semaphore.success('Runtime configuration has been loaded')

  return context
}

module.exports = readRuntimeConfig

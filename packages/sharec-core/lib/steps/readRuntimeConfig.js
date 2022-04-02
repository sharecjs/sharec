// @ts-check
const { stat } = require('sharec-utils').std
const { join } = require('sharec-utils').path

/**
 * @typedef {import('../').FlowContext} FlowContext
 */

/**
 * TODO: don't know how to cover the function with unit-tests
 * `require` can't work inside `memfs`
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
const readRuntimeConfig = async (context) => {
  const { targetPath } = context
  const runtimeConfigPath = join(targetPath, '.sharecrc.js')

  try {
    await stat(runtimeConfigPath)
  } catch (err) {
    return context
  }

  context.runtimeConfig = require(runtimeConfigPath)

  return context
}

module.exports = readRuntimeConfig

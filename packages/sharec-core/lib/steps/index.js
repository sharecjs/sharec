// @ts-check
const readConfigsPackages = require('./readConfigsPackages')
const readTargetPackage = require('./readTargetPackage')
const readCache = require('./readCache')
const readRuntimeConfig = require('./readRuntimeConfig')
const writeConfigs = require('./writeConfigs')
const writeCache = require('./writeCache')
const writeLockdata = require('./writeLockdata')
const mergeConfigsPackages = require('./mergeConfigsPackages')

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').FlowStep} FlowStep
 */

/**
 * Composes steps in one function
 * Executes each step and pass result to the next one
 * @param {...FlowStep} steps Steps functions
 * @returns {Function}
 */
const composeSteps = (...steps) =>
  /**
   * @param {FlowContext} context
   * @returns {Promise<FlowContext>}
   */
  async (context) => {
    let lastInput = context

    for (const step of steps) {
      lastInput = await step(lastInput)
    }

    return lastInput
  }

const commonFlow = composeSteps(
  readTargetPackage,
  readCache,
  readConfigsPackages,
  readRuntimeConfig,
  mergeConfigsPackages,
  writeConfigs,
  writeLockdata,
  writeCache,
)

module.exports = {
  commonFlow,
}

// @ts-check
const readConfigsPackages = require('./readConfigsPackages')
const readTargetPackage = require('./readTargetPackage')
const readCache = require('./readCache')
const readRuntimeConfig = require('./readRuntimeConfig')
const writeConfigs = require('./writeConfigs')
const writeCache = require('./writeCache')
const writeLockdata = require('./writeLockdata')
const mergeConfigsPackages = require('./mergeConfigsPackages')
const applyRuntimeHook = require('./applyRuntimeHook')

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').FlowStep} FlowStep
 * @typedef {import('../').Semaphore} Semaphore
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
   * @param {Semaphore} semaphore
   * @returns {Promise<FlowContext>}
   */
  async (context, semaphore) => {
    let lastInput = context

    for (const step of steps) {
      lastInput = await step(lastInput, semaphore)
    }

    return lastInput
  }

const commonFlow = composeSteps(
  readTargetPackage,
  readCache,
  readConfigsPackages,
  readRuntimeConfig,
  applyRuntimeHook('beforeMerge'),
  mergeConfigsPackages,
  applyRuntimeHook('afterMerge'),
  writeConfigs,
  writeLockdata,
  writeCache,
)

module.exports = {
  commonFlow,
}

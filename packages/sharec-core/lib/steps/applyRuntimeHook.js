// @ts-check

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').FlowStep} FlowStep
 * @typedef {import('../').Semaphore} Semaphore
 */

/**
 * @param {'beforeMerge'|'afterMerge'} hook
 * @returns {FlowStep}
 */
const readRuntimeConfig = (hook) => async (context, semaphore) => {
  const { runtimeConfig = {} } = context

  if (!runtimeConfig[hook]) return context

  return runtimeConfig[hook](context, semaphore)
}

module.exports = readRuntimeConfig

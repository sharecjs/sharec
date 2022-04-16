// @ts-check

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').Semaphore} Semaphore
 */

/**
 * @param {'beforeMerge'|'afterMerge'} hook
 * @returns {(context: FlowContext) => Promise<FlowContext>}
 */
const readRuntimeConfig = (hook) =>
  /**
   * TODO: don't know how to cover the function with unit-tests
   * `require` can't work inside `memfs`
   * @param {FlowContext} context
   * @param {Semaphore} semaphore
   * @returns {Promise<FlowContext>}
   */
  async (context, semaphore) => {
    const { runtimeConfig = {} } = context

    if (!runtimeConfig[hook]) return context

    return runtimeConfig[hook](context, semaphore)
  }

module.exports = readRuntimeConfig

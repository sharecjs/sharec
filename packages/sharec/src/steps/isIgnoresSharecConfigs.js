// @ts-check
const get = require('lodash/get')
const { InternalError, CAUSES } = require('../errors')

/**
 * @typedef {import('../').StepWrapperPayload} StepWrapperPayload
 * @typedef {import('../').Input} Input
 */

/**
 * @param {StepWrapperPayload} [payload]
 * @returns {Function}
 */
const isIgnoresSharecConfigs = (payload) =>
  /**
   * @param {Input} input
   * @returns {Input}
   */
  (input) => {
    const isIgnoresSharec = get(input.targetPackage, 'sharec.ignore', false)

    if (!isIgnoresSharec) return input

    throw new InternalError(CAUSES.IS_IGNORES_SHAREC.message(), CAUSES.IS_IGNORES_SHAREC.symbol)
  }

module.exports = isIgnoresSharecConfigs

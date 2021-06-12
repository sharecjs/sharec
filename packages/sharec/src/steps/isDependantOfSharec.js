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
const isDependantOfSharec = (payload) =>
  /**
   * @param {Input} input
   * @returns {Input}
   */
  (input) => {
    const { targetPackage } = input
    const targetDependencies = get(targetPackage, 'dependencies', {})

    if (!Object.keys(targetDependencies).includes('sharec')) {
      return input
    }

    throw new InternalError(CAUSES.IS_DEPENDANT_OF_SHAREC.message(), CAUSES.IS_DEPENDANT_OF_SHAREC.symbol)
  }

module.exports = isDependantOfSharec

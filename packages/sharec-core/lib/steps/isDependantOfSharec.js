// @ts-check
const get = require('lodash/get')
const { InternalError, errorCauses } = require('../errors')

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Input}
 */
const isDependantOfSharec = (input) => {
  const { targetPackage } = input
  const targetDependencies = get(targetPackage, 'dependencies', {})

  if (!Object.keys(targetDependencies).includes('sharec')) {
    return input
  }

  throw new InternalError(errorCauses.IS_DEPENDANT_OF_SHAREC.message(), errorCauses.IS_DEPENDANT_OF_SHAREC.symbol)
}

module.exports = isDependantOfSharec

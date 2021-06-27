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
const isIgnoresSharecConfigs = (input) => {
  const isIgnoresSharec = get(input.targetPackage, 'sharec.ignore', false)

  if (!isIgnoresSharec) return input

  throw new InternalError(errorCauses.IS_IGNORES_SHAREC.message(), errorCauses.IS_IGNORES_SHAREC.symbol)
}

module.exports = isIgnoresSharecConfigs

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
const isAlreadyInstalled = (input) => {
  const { upcomingPackage, targetPackage } = input
  const installedConfigName = get(targetPackage, 'sharec.config', null)
  const installedConfigVersion = get(targetPackage, 'sharec.version', null)
  const isTheSameConfig = installedConfigName === upcomingPackage.name
  const isTheSameVersion = installedConfigVersion === upcomingPackage.version

  if (isTheSameConfig && isTheSameVersion) {
    throw new InternalError(errorCauses.ALREADY_INSTALLED.message(), errorCauses.ALREADY_INSTALLED.symbol)
  }

  return input
}

module.exports = isAlreadyInstalled

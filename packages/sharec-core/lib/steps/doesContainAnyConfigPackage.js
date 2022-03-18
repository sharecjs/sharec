// @ts-check

const { InternalError, errorCauses } = require('../errors')

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const doesContainAnyConfigPackage = async (input) => {
  const { targetPackage } = input
  const dependenciesKeys = ['dependencies', 'devDependencies']

  switch (true) {
    case !targetPackage.sharec:
    case !targetPackage.sharec.configs:
    case targetPackage.sharec.configs.length === 0:
      throw new InternalError(errorCauses.DOES_NOT_HAVE_ANY_CONFIG.message, errorCauses.DOES_NOT_HAVE_ANY_CONFIG.symbol)
    default:
      break
  }

  const hasAnyInstalledConfig = dependenciesKeys
    .map((depKey) => targetPackage[depKey])
    .filter(Boolean)
    .flatMap(Object.keys)
    .find((key) => targetPackage.sharec.configs.includes(key))

  if (!hasAnyInstalledConfig) {
    throw new InternalError(errorCauses.DOES_NOT_HAVE_ANY_CONFIG.message, errorCauses.DOES_NOT_HAVE_ANY_CONFIG.symbol)
  }

  return input
}

module.exports = doesContainAnyConfigPackage

const get = require('lodash/get')
const { InternalError, CAUSES } = require('../errors')

const isAlreadyInstalled = input => {
  const { upcomingPackage, targetPackage } = input
  const installedConfigName = get(targetPackage, 'sharec.config', null)
  const installedConfigVersion = get(targetPackage, 'sharec.version', null)
  const isTheSameConfig = installedConfigName === upcomingPackage.name
  const isTheSameVersion = installedConfigVersion === upcomingPackage.version

  if (isTheSameConfig && isTheSameVersion) {
    throw new InternalError(
      CAUSES.ALREADY_INSTALLED.message(),
      CAUSES.ALREADY_INSTALLED.symbol,
    )
  }

  return input
}

module.exports = isAlreadyInstalled

const get = require('lodash/get')
const { InternalError, CAUSES } = require('../errors')

const isDependantOfSharec = (spinner) => (input) => {
  const { targetPackage } = input
  const targetDependencies = get(targetPackage, 'dependencies', {})

  if (!Object.keys(targetDependencies).includes('sharec')) {
    return input
  }

  throw new InternalError(CAUSES.IS_DEPENDANT_OF_SHAREC.message(), CAUSES.IS_DEPENDANT_OF_SHAREC.symbol)
}

module.exports = isDependantOfSharec

const get = require('lodash/get')
const { InternalError, CAUSES } = require('../errors')

const isIgnoresSharecConfigs = (spinner) => (input) => {
  const isIgnoresSharec = get(input.targetPackage, 'sharec.ignore', false)

  if (!isIgnoresSharec) return input

  throw new InternalError(CAUSES.IS_IGNORES_SHAREC.message(), CAUSES.IS_IGNORES_SHAREC.symbol)
}

module.exports = isIgnoresSharecConfigs

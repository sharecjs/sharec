const { LinearStrategy } = require('../strategy')

class EslintIgnoreStrategy extends LinearStrategy {}

const eslintIgnoreStrategy = new EslintIgnoreStrategy(['.eslintignore'])

module.exports = {
  EslintIgnoreStrategy,
  eslintIgnoreStrategy,
}

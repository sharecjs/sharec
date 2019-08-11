const LinearStrategy = require('../LinearStrategy')

class EslintIgnoreStrategy extends LinearStrategy {}

const eslintIgnoreStrategy = new EslintIgnoreStrategy(['.eslintignore'])

module.exports = {
  EslintIgnoreStrategy,
  eslintIgnoreStrategy,
}

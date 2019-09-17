const Strategy = require('../Strategy')

class EslintIgnoreStrategy extends Strategy {}

const eslintIgnoreStrategy = new EslintIgnoreStrategy({
  json: ['eslintIgnore'],
  lines: ['.eslintignore'],
})

module.exports = {
  EslintIgnoreStrategy,
  eslintIgnoreStrategy,
}

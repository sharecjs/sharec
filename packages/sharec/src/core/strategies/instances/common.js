const Strategy = require('../Strategy')

class CommonStrategy extends Strategy {}

const commonStrategy = new CommonStrategy()

module.exports = {
  CommonStrategy,
  commonStrategy,
}

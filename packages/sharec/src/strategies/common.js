const { Strategy } = require('../utils/strategy')

class CommonStrategy extends Strategy {}
const commonStrategy = new CommonStrategy()

module.exports = {
  CommonStrategy,
  commonStrategy,
}

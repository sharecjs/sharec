const { commonStrategy } = require('./common')
const { babelStrategy } = require('./babel')
const { eslintStrategy } = require('./eslint')
const { yaspellerStrategy } = require('./yaspeller')

module.exports = {
  commonStrategy,
  babelStrategy,
  eslintStrategy,
  yaspellerStrategy,
}

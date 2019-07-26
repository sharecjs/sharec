const { commonStrategy } = require('./common')
const { babelStrategy } = require('./babel')
const { eslintStrategy } = require('./eslint')
const { yaspellerStrategy } = require('./yaspeller')
const { npmIgnoreStrategy } = require('./npmignore')
const { gitIgnoreStrategy } = require('./gitignore')

module.exports = {
  commonStrategy,
  babelStrategy,
  eslintStrategy,
  yaspellerStrategy,
  npmIgnoreStrategy,
  gitIgnoreStrategy,
}

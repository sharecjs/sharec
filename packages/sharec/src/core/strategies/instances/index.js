const { commonStrategy } = require('./common')
const { babelStrategy } = require('./babel')
const { eslintStrategy } = require('./eslint')
const { yaspellerStrategy } = require('./yaspeller')
const { npmIgnoreStrategy } = require('./npmignore')
const { gitIgnoreStrategy } = require('./gitignore')
const { eslintIgnoreStrategy } = require('./eslintignore')
const { packageJsonStrategy } = require('./packageJson')

module.exports = {
  commonStrategy,
  babelStrategy,
  eslintStrategy,
  yaspellerStrategy,
  npmIgnoreStrategy,
  gitIgnoreStrategy,
  eslintIgnoreStrategy,
  packageJsonStrategy,
}

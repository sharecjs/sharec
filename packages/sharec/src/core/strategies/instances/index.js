const { commonStrategy } = require('./common')
const { browserslistStrategy } = require('./browserslist')
const { postcssStrategy } = require('./postcss')
const { babelStrategy } = require('./babel')
const { eslintStrategy } = require('./eslint')
const { yaspellerStrategy } = require('./yaspeller')
const { npmIgnoreStrategy } = require('./npmignore')
const { gitIgnoreStrategy } = require('./gitignore')
const { eslintIgnoreStrategy } = require('./eslintIgnore')
const { packageJsonStrategy } = require('./packageJson')

module.exports = {
  commonStrategy,
  browserslistStrategy,
  postcssStrategy,
  babelStrategy,
  eslintStrategy,
  yaspellerStrategy,
  npmIgnoreStrategy,
  gitIgnoreStrategy,
  eslintIgnoreStrategy,
  packageJsonStrategy,
}

const { Strategy } = require('../strategy')

class PackageJsonStrategy extends Strategy {}
const packageJsonStrategy = new PackageJsonStrategy({
  json: ['scripts'],
})

module.exports = {
  PackageJsonStrategy,
  packageJsonStrategy,
}

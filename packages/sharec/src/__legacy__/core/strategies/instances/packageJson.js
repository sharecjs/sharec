const Strategy = require('../Strategy')

class PackageJsonStrategy extends Strategy {}

const packageJsonStrategy = new PackageJsonStrategy({
  matchers: {
    json: [
      'scripts',
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
      'bundledDependencies',
    ],
  },
})

module.exports = {
  PackageJsonStrategy,
  packageJsonStrategy,
}

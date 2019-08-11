const Strategy = require('../Strategy')

class NPMIgnoreStrategy extends Strategy {}

const npmIgnoreStrategy = new NPMIgnoreStrategy({
  lines: ['.npmignore'],
})

module.exports = {
  NPMIgnoreStrategy,
  npmIgnoreStrategy,
}

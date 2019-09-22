const Strategy = require('../Strategy')

class NPMIgnoreStrategy extends Strategy {}

const npmIgnoreStrategy = new NPMIgnoreStrategy({
  matchers: {
    lines: ['.npmignore', 'npmignore'],
  },
  alias: '.npmignore',
})

module.exports = {
  NPMIgnoreStrategy,
  npmIgnoreStrategy,
}

const Strategy = require('../Strategy')

class GitIgnoreStrategy extends Strategy {}

const gitIgnoreStrategy = new GitIgnoreStrategy({
  matchers: {
    lines: ['.gitignore', 'gitignore'],
  },
  alias: '.gitignore',
})

module.exports = {
  GitIgnoreStrategy,
  gitIgnoreStrategy,
}

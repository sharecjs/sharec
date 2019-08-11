const Strategy = require('../Strategy')

class GitIgnoreStrategy extends Strategy {}

const gitIgnoreStrategy = new GitIgnoreStrategy({
  lines: ['.gitignore'],
})

module.exports = {
  GitIgnoreStrategy,
  gitIgnoreStrategy,
}

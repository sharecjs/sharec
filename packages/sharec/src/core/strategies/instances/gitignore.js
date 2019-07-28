const { LinearStrategy } = require('../strategy')

class GitIgnoreStrategy extends LinearStrategy {}

const gitIgnoreStrategy = new GitIgnoreStrategy(['.gitignore'])

module.exports = {
  GitIgnoreStrategy,
  gitIgnoreStrategy,
}

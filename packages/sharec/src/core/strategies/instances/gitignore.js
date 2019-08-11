const LinearStrategy = require('../LinearStrategy')

class GitIgnoreStrategy extends LinearStrategy {}

const gitIgnoreStrategy = new GitIgnoreStrategy(['.gitignore'])

module.exports = {
  GitIgnoreStrategy,
  gitIgnoreStrategy,
}

const { LinearStrategy } = require('../strategy')

class NPMIgnoreStrategy extends LinearStrategy {}

const npmIgnoreStrategy = new NPMIgnoreStrategy(['.npmignore'])

module.exports = {
  NPMIgnoreStrategy,
  npmIgnoreStrategy,
}

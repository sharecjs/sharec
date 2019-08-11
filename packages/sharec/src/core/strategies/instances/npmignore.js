const LinearStrategy = require('../LinearStrategy')

class NPMIgnoreStrategy extends LinearStrategy {}

const npmIgnoreStrategy = new NPMIgnoreStrategy(['.npmignore'])

module.exports = {
  NPMIgnoreStrategy,
  npmIgnoreStrategy,
}

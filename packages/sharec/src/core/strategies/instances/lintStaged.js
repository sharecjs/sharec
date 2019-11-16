const Strategy = require('../Strategy')

class LintStagedStrategy extends Strategy {}

const lintStagedStrategy = new LintStagedStrategy({
  matchers: {
    json: ['.lintstagedrc', 'lint-staged'],
  },
})

module.exports = {
  LintStagedStrategy,
  lintStagedStrategy,
}

const { withYaml } = require('../utils/strategies')

const strategy = (a, b) => ({
  ...a,
  ...b,
})

const yamlStrategy = withYaml(strategy)

module.exports = {
  strategy,
  yamlStrategy,
}

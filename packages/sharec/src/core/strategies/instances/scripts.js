const Strategy = require('../Strategy')
const { transformJSONInput } = require('../../utils/json')

class ScriptsStrategy extends Strategy {
  mergeJSON({ current, upcoming }) {
    const [a, b] = transformJSONInput(current, upcoming)
    const mergedConfig = {}

    // Object.keys(a).forEach(key => {})
    // ?
  }

  unapplyJSON({ current, upcoming }) {
    const [a, b] = transformJSONInput(current, upcoming)
    // ?
  }
}

const scriptsStrategy = new ScriptsStrategy({
  matchers: {
    json: ['scripts'],
  },
})

module.exports = {
  ScriptsStrategy,
  scriptsStrategy,
}

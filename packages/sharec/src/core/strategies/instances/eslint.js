const isEmpty = require('lodash/isEmpty')
const Strategy = require('../Strategy')
const {
  withoutKeys,
  mergeHashesWithKeys,
  deepMergeHashesWithoutKeys,
  hashesDiff,
  shallowHashesChangesDiff,
} = require('../../../utils/hashes')

class EslintStrategy extends Strategy {
  mergeJSON({ current, upcoming }) {
    const [a, b] = [current, upcoming].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )
    const newConfig = deepMergeHashesWithoutKeys(a, b, ['rules'])

    return Object.assign(newConfig, mergeHashesWithKeys(a, b, ['rules']))
  }

  unapplyJSON({ current, upcoming }) {
    const [a, b] = [current, upcoming].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )
    const restoredConfig = withoutKeys(hashesDiff, ['rules'])(a, b)
    const rulesA = a.rules || {}
    const rulesB = b.rules || {}
    const restoredRules = shallowHashesChangesDiff(rulesA, rulesB)

    return isEmpty(restoredRules)
      ? restoredConfig
      : Object.assign(restoredConfig, {
          rules: restoredRules,
        })
  }
}

const eslintStrategy = new EslintStrategy({
  matchers: {
    json: ['eslintConfig', '.eslintrc', 'eslintrc.json'],
    yaml: ['eslintrc.yml', 'eslintrc.yaml', '.eslintrc.yml', '.eslintrc.yaml'],
  },
})

module.exports = {
  EslintStrategy,
  eslintStrategy,
}

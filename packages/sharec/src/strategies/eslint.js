const isEmpty = require('lodash/isEmpty')
const { Strategy } = require('../utils/strategy')
const {
  withoutKeys,
  mergeHashesWithKeys,
  deepMergeHashesWithoutKeys,
  hashesDiff,
  shallowHashesChangesDiff,
} = require('../utils/hashes')

class EslintStrategy extends Strategy {
  mergeJSON(rawA, rawB) {
    const [a, b] = [rawA, rawB].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )
    const newConfig = deepMergeHashesWithoutKeys(a, b, ['rules'])

    return Object.assign(newConfig, mergeHashesWithKeys(a, b, ['rules']))
  }

  unapplyJSON(rawA, rawB) {
    const [a, b] = [rawA, rawB].map(config =>
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
  json: ['eslintConfig', '.eslintrc', 'eslintrc.json'],
  yaml: ['eslintrc.yml', 'eslintrc.yaml', '.eslintrc.yml', '.eslintrc.yaml'],
})

module.exports = {
  EslintStrategy,
  eslintStrategy,
}

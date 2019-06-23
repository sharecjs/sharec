const { Strategy } = require('../utils/strategy')
const {
  mergeHashesWithKeys,
  deepMergeHashesWithoutKeys,
  deepRemoveHashesIntersectionWithKeys,
  deepRemoveHashesIntersectionWithoutKeys,
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
    const clearedConfig = deepRemoveHashesIntersectionWithoutKeys(a, b, [
      'rules',
    ])
    const clearedRules = deepRemoveHashesIntersectionWithKeys(a, b, ['rules'])

    return Object.assign(clearedConfig, clearedRules)
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

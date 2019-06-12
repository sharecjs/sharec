const { Strategy } = require('../utils/strategy')
const {
  mergeHashesWithKeys,
  deepMergeHashesWithoutKeys,
} = require('../utils/hashes')

class EslintStrategy extends Strategy {
  mergeJSON(rawA, rawB) {
    const [a, b] = [rawA, rawB].map(config =>
      typeof config === 'string' ? JSON.parse(config) : config,
    )
    const newConfig = deepMergeHashesWithoutKeys(a, b, ['rules'])

    return Object.assign(newConfig, mergeHashesWithKeys(a, b, ['rules']))
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

const {
  mergeHashesWithKeys,
  deepMergeHashesWithoutKeys,
} = require('../utils/hashes')
const { withYaml } = require('../utils/strategies')

const strategy = (rawA, rawB) => {
  const [a, b] = [rawA, rawB].map(config =>
    typeof config === 'string' ? JSON.parse(config) : config,
  )
  const newConfig = deepMergeHashesWithoutKeys(a, b, ['rules'])

  return Object.assign(newConfig, mergeHashesWithKeys(a, b, ['rules']))
}

const yamlStrategy = withYaml(strategy)

module.exports = {
  strategy,
  yamlStrategy,
}

const { transformInput, toYaml } = require('utils/yaml')

const withYaml = strategy => (yA, yB) => {
  const [a, b] = transformInput(yA, yB)
  const newConfig = strategy(a, b)

  return toYaml(newConfig)
}

module.exports = {
  withYaml,
}

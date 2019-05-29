const path = require('path')
const strategies = require('../strategies')
const strategiesMap = require('../strategies/strategiesMap.json')

const determineConfigStrategy = filePath => {
  const fileName = path.basename(filePath)
  const fileExt = path.extname(filePath)
  const isYaml = /\.yma?l/.test(fileExt)
  const isJson = /\.json/.test(fileExt)
  const target = strategiesMap.find(strategy => strategy[1].includes(fileName))

  switch (true) {
    case Boolean(target) && isYaml:
      return strategies[target[0]].yamlStrategy
    case Boolean(target):
      return strategies[target[0]].strategy
    case isYaml:
      return strategies.common.yamlStrategy
    case isJson:
      return strategies.common.strategy
    default:
      return null
  }
}

module.exports = {
  determineConfigStrategy,
}

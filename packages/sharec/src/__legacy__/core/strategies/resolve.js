const path = require('path')
const strategies = require('./instances')

const resolveConfigStrategy = filePath => {
  const fileName = path.basename(filePath)
  const { commonStrategy, ...specialStrategies } = strategies
  const targetStrategyKey = Object.keys(specialStrategies).find(key =>
    specialStrategies[key].isExpectedStrategy(fileName),
  )

  if (targetStrategyKey) {
    return specialStrategies[targetStrategyKey]
  }

  return commonStrategy
}

module.exports = {
  resolveConfigStrategy,
}

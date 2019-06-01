const { processConfig } = require('./configsProcessor')
const { processPackageJson } = require('./packageProcessor')

const execute = async (configsPath, targetPath, configs) => {
  const standaloneConfigs = configs.filter(
    filePath => !/(package\.json)/.test(filePath),
  )

  await Promise.all(
    standaloneConfigs.map(configPath =>
      processConfig(configsPath, targetPath, configPath),
    ),
  )

  if (!configs.find(filePath => /(package\.json)/.test(filePath))) return

  await processPackageJson(configsPath, targetPath)
}

module.exports = {
  execute,
}

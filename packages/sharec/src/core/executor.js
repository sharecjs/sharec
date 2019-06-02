const { processConfig } = require('./configsProcessor')
const { processPackageJson } = require('./packageProcessor')

const executeInjection = async (configsPath, targetPath, configs) => {
  const standaloneConfigs = configs.filter(
    filePath => !/(package\.json)/.test(filePath),
  )

  await Promise.all(
    standaloneConfigs.map(configPath =>
      processConfig(configsPath, targetPath, configPath),
    ),
  )
  await processPackageJson(configsPath, targetPath)
}

const executeUninstall = async (configsPath, targetPath) => {}

const executeUpdate = async (configsPath, targetPath) => {}

module.exports = {
  executeInjection,
  executeUninstall,
  executeUpdate,
}

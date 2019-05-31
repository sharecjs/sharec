const path = require('path')
const { pipe } = require('utils')
const { readFile, writeFile } = require('utils/fs')
const { processConfig } = require('./configs')
/* eslint-disable */
const {
  extractDependencies,
  extractConfigs,
  extractMetaData,
  injectConfigs,
  injectDependencies,
  injectMetaData,
  ereaseConfigs,
  ereaseDependencies,
  ereaseMetaData,
} = require('./package')
/* eslint-enable */

// TODO: move package.json logic to external function
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

  const targetPackageJsonPath = path.resolve(targetPath, 'package.json')
  const packageJsonPath = path.resolve(configsPath, 'package.json')

  // PackageJson
  const rawPackageJson = await readFile(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(rawPackageJson)
  const rawTargetPackageJson = await readFile(targetPackageJsonPath)
  const targetPackageJson = JSON.parse(rawTargetPackageJson)
  const newDependencies = extractDependencies(packageJson)
  const newConfigs = extractConfigs(packageJson)
  const newPackageJson = pipe(
    injectConfigs(newConfigs),
    injectDependencies(newDependencies),
    injectMetaData({
      injected: true,
    }),
  )(targetPackageJson)

  await writeFile(
    targetPackageJsonPath,
    JSON.stringify(newPackageJson, null, 2),
    'utf8',
  )
}

module.exports = {
  execute,
}

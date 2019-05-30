const path = require('path')
const { pipe } = require('utils')
const { readFile, writeFile } = require('utils/fs')
const { collectConfigsPaths } = require('./collector')
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
const execute = async (configsPath, targetPath) => {
  const configs = await collectConfigsPaths(configsPath)
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
  const rawPackageJson = await readFile(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(rawPackageJson)
  let targetPackageJson = null

  try {
    const rawTargetPackageJson = await readFile(targetPackageJsonPath)
    targetPackageJson = JSON.parse(rawTargetPackageJson)
  } catch (err) {}

  if (!targetPackageJson) {
    return writeFile(targetPackageJsonPath, packageJson, 'utf8')
  }

  // const metaData = extractMetaData(targetPackageJson)
  const dependencies = extractDependencies(packageJson)
  const newConfigs = extractConfigs(packageJson)

  targetPackageJson = pipe(
    injectConfigs(newConfigs),
    injectDependencies(dependencies),
    injectMetaData({
      injected: true,
    }),
  )(targetPackageJson)

  await writeFile(
    targetPackageJsonPath,
    JSON.stringify(targetPackageJson, null, 2),
    'utf8',
  )
}

module.exports = {
  execute,
}

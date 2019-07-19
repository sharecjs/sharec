const path = require('path')
const { pipe } = require('../../utils')
const { readFile, writeFile } = require('../../utils/fs')
const { resolveConfigStrategy } = require('../strategies/resolve')
const { extractDependencies, extractConfigs } = require('./extract')

const installPackageJson = async ({
  configsPath,
  configsVersion,
  targetPath,
}) => {
  const targetPackageJsonPath = path.resolve(targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath)
  const targetPackageJson = JSON.parse(rawTargetPackageJson)
  let newPackageJson = { ...targetPackageJson }

  try {
    const packageJsonPath = path.resolve(configsPath, 'package.json')
    const rawPackageJson = await readFile(packageJsonPath, 'utf8')
    const packageJson = JSON.parse(rawPackageJson)
    const newDependencies = extractDependencies(packageJson)
    const newConfigs = extractConfigs(packageJson)

    newPackageJson = pipe(
      injectConfigs(newConfigs),
      injectDependencies(newDependencies),
      injectMetaData({
        version: configsVersion,
      }),
    )(targetPackageJson)
  } catch (err) {
    newPackageJson = pipe(
      injectMetaData({
        version: configsVersion,
      }),
    )(targetPackageJson)
  }

  await writeFile(
    targetPackageJsonPath,
    JSON.stringify(newPackageJson, null, 2),
    'utf8',
  )
}

const injectConfigs = configs => packageJson => {
  const updatedPackageJson = { ...packageJson }

  Object.keys(configs).forEach(key => {
    const strategy = resolveConfigStrategy(key)

    if (strategy) {
      Object.assign(updatedPackageJson, {
        [key]: strategy.merge(key)(updatedPackageJson[key], configs[key]),
      })
    } else {
      Object.assign(updatedPackageJson, {
        [key]: configs[key],
      })
    }
  })

  return updatedPackageJson
}

const injectDependencies = dependencies => packageJson => {
  const updatedPackageJson = { ...packageJson }

  Object.keys(dependencies).forEach(key => {
    if (!packageJson[key]) {
      Object.assign(updatedPackageJson, {
        [key]: dependencies[key],
      })
    } else {
      Object.assign(updatedPackageJson[key], dependencies[key])
    }
  })

  return updatedPackageJson
}

const injectMetaData = metaData => packageJson => ({
  ...packageJson,
  sharec: metaData,
})

module.exports = {
  installPackageJson,
  injectDependencies,
  injectConfigs,
  injectMetaData,
}

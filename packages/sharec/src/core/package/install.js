const path = require('path')
const { pipe } = require('../../utils')
const { readFile, writeFile } = require('../../utils/std').fs
const { resolveConfigStrategy } = require('../strategies/resolve')
const { extractConfigs } = require('./extract')

/**
 * @typedef {Object} MetaData
 * @property {String} version
 * @property {String} config
 */

const installPackageJson = async ({
  configsPath,
  configsName,
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
    const newConfigs = extractConfigs(packageJson)

    newPackageJson = pipe(
      injectConfigs(newConfigs),
      injectMetaData({
        config: configsName,
        version: configsVersion,
      }),
    )(targetPackageJson)
  } catch (err) {
    newPackageJson = pipe(
      injectMetaData({
        config: configsName,
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
        [key]: strategy.merge(key)({
          current: updatedPackageJson[key],
          upcoming: configs[key],
        }),
      })
    } else {
      Object.assign(updatedPackageJson, {
        [key]: configs[key],
      })
    }
  })

  return updatedPackageJson
}

/**
 * @param {MetaData} meta
 * @returns {Function}
 */
const injectMetaData = meta => packageJson => ({
  ...packageJson,
  sharec: {
    config: meta.config,
    version: meta.version,
  },
})

module.exports = {
  installPackageJson,
  injectConfigs,
  injectMetaData,
}

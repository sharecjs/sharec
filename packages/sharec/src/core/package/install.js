const path = require('path')
const { readFile, writeFile } = require('../../utils/std').fs
const { resolveConfigStrategy } = require('../strategies/resolve')
const { cacheConfig, loadConfigCache } = require('../cache')
const { extractConfigs } = require('./extract')

/**
 * @typedef {Object} MetaData
 * @property {String} version
 * @property {String} config
 */

const installPackageJson = async ({
  installedMeta,
  upcomingMeta,
  configsPath,
  targetPath,
  overwrite,
}) => {
  const configCache = installedMeta
    ? await loadConfigCache({
        configsMeta: installedMeta,
        configPath: 'package.json',
        targetPath,
      })
    : null
  const targetPackageJsonPath = path.resolve(targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath)
  const targetPackageJson = JSON.parse(rawTargetPackageJson)
  const upcomingPackageJsonPath = path.resolve(configsPath, 'package.json')
  const rawUpcomingPackageJson = await readFile(upcomingPackageJsonPath, 'utf8')
  let newPackageJson = { ...targetPackageJson }

  try {
    const cachedPackageJson = configCache ? JSON.parse(configCache) : {}
    const rawPackageJson = JSON.parse(rawUpcomingPackageJson)
    const newConfigs = extractConfigs(rawPackageJson)

    newPackageJson = injectConfigs({
      packageJson: targetPackageJson,
      configs: newConfigs,
      configsCache: cachedPackageJson,
      overwrite,
    })
  } catch (err) {
    console.log(err)
  }

  await writeFile(
    targetPackageJsonPath,
    JSON.stringify(newPackageJson, null, 2),
    'utf8',
  )
  await cacheConfig({
    configsMeta: upcomingMeta,
    configPath: 'package.json',
    configSource: rawUpcomingPackageJson,
    targetPath,
  })
}

const injectConfigs = ({ packageJson, configs, configsCache, overwrite }) => {
  const updatedPackageJson = { ...packageJson }

  Object.keys(configs).forEach(config => {
    const targetStrategy = resolveConfigStrategy(config)

    if (overwrite) {
      Object.assign(updatedPackageJson, {
        [config]: configs[config],
      })
      return
    }

    if (targetStrategy) {
      const mergedConfigField = targetStrategy.merge(config)({
        current: updatedPackageJson[config],
        upcoming: configs[config],
        cached: configsCache[config],
      })

      Object.assign(updatedPackageJson, {
        [config]: mergedConfigField,
      })
    } else {
      Object.assign(updatedPackageJson, {
        [config]: configs[config],
      })
    }
  })

  return updatedPackageJson
}

/**
 * @param {Object} options
 * @param {String} options.targetPath
 * @param {MetaData} options.meta
 * @returns {Promise<void>}
 */
const injectMeta = async ({ targetPath, meta }) => {
  const targetPackageJsonPath = path.resolve(targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath)
  const targetPackageJson = JSON.parse(rawTargetPackageJson)

  await writeFile(
    targetPackageJsonPath,
    JSON.stringify(
      {
        ...targetPackageJson,
        sharec: meta,
      },
      null,
      2,
    ),
  )
}

module.exports = {
  installPackageJson,
  injectConfigs,
  injectMeta,
}

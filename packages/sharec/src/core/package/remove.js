const path = require('path')
const unset = require('lodash/unset')
const omit = require('lodash/omit')
const isEmpty = require('lodash/isEmpty')
const { pipe } = require('../../utils')
const { readFile, writeFile } = require('../../utils/std').fs
const { extractConfigs } = require('../package/extract')
const { resolveConfigStrategy } = require('../strategies/resolve')

const clearPackageJson = async ({ configsPath, targetPath }) => {
  const targetPackageJsonPath = path.resolve(targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath)
  const targetPackageJson = JSON.parse(rawTargetPackageJson)

  try {
    const packageJsonPath = path.resolve(configsPath, 'package.json')
    const rawPackageJson = await readFile(packageJsonPath, 'utf8')
    const packageJson = JSON.parse(rawPackageJson)
    const newConfigs = extractConfigs(packageJson)
    const restoredPackageJson = pipe(
      ereaseConfigs(newConfigs),
      ereaseMetaData,
    )(targetPackageJson)

    await writeFile(
      targetPackageJsonPath,
      JSON.stringify(restoredPackageJson, null, 2),
      'utf8',
    )
  } catch (err) {
    const restoredPackageJson = pipe(ereaseMetaData)(targetPackageJson)

    await writeFile(
      targetPackageJsonPath,
      JSON.stringify(restoredPackageJson, null, 2),
      'utf8',
    )

    return null
  }
}

const ereaseConfigs = configs => packageJson => {
  const restoredPackageJson = { ...packageJson }

  Object.keys(configs).forEach(key => {
    if (!packageJson[key]) return

    const strategy = resolveConfigStrategy(key)

    if (!strategy) return

    const restoredConfig = strategy.unapply(key)({
      current: restoredPackageJson[key],
      upcoming: configs[key],
    })

    if (isEmpty(restoredConfig)) {
      unset(restoredPackageJson, key)
    } else {
      restoredPackageJson[key] = restoredConfig
    }
  })

  return restoredPackageJson
}

const ereaseDependenciesFrom = (dependencies, target) => {
  const mismatchedDeps = {}
  const updatedDeps = Object.keys(dependencies).reduce(
    (acc, key) => {
      if (!target[key]) return acc

      if (dependencies[key] !== target[key]) {
        Object.assign(mismatchedDeps, {
          [key]: `${dependencies[key]} -> ${target[key]}`,
        })

        return acc
      }

      return omit(acc, [key])
    },
    { ...target },
  )

  return [updatedDeps, mismatchedDeps]
}

const ereaseDependencies = dependencies => packageJson => {
  const mismatchedDeps = {}
  const targetPackageJson = { ...packageJson }
  const updatedDeps = Object.keys(dependencies).reduce(
    (acc, key) => {
      if (!packageJson[key]) return acc

      const depsByType = dependencies[key]
      const [deps, mismatch] = ereaseDependenciesFrom(
        depsByType,
        packageJson[key],
      )

      Object.assign(mismatchedDeps, mismatch)

      return {
        ...acc,
        [key]: deps,
      }
    },
    { ...targetPackageJson },
  )

  return [updatedDeps, mismatchedDeps]
}

const ereaseMetaData = packageJson => omit(packageJson, ['sharec'])

module.exports = {
  clearPackageJson,
  ereaseDependencies,
  ereaseConfigs,
  ereaseMetaData,
}

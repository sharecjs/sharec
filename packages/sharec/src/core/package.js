const omit = require('lodash/omit')
const pick = require('lodash/pick')
const { determineConfigStrategy } = require('./strategist')

const DEPENDENCIES_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]
const IGNORED_FIELDS = [
  'sharec',
  'name',
  'version',
  'description',
  'keywords',
  'homepage',
  'bugs',
  'license',
  'people',
  'man',
  'repository',
  'os',
  'cpu',
  'preferGlobal',
  'private',
  'author',
  ...DEPENDENCIES_FIELDS,
]

// Extraction

const extractDependencies = packageJson =>
  pick(packageJson, DEPENDENCIES_FIELDS)

const extractConfigs = packageJson => omit(packageJson, IGNORED_FIELDS)

const extractMetaData = packageJson => packageJson.sharec || null

// Inject

const injectConfigs = configs => packageJson => {
  const updatedPackageJson = { ...packageJson }

  Object.keys(configs).forEach(key => {
    const strategy = determineConfigStrategy(key)

    Object.assign(updatedPackageJson, {
      [key]: strategy
        ? strategy(updatedPackageJson[key], configs[key])
        : configs[key],
    })
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

// Ereasing

const ereaseConfigs = configs => packageJson => {}

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
  extractDependencies,
  extractConfigs,
  extractMetaData,
  injectConfigs,
  injectDependencies,
  injectMetaData,
  ereaseConfigs,
  ereaseDependencies,
  ereaseMetaData,
}

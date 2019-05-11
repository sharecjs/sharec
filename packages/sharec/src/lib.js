const fs = require('fs')
const path = require('path')
const { readDir, readFile, copyFile, writeFile, exec } = require('./utils')

const ignoredFiles = ['yarn.lock', 'package-lock.json', 'node_modules']

function filterConfigs(configs) {
  return configs.filter(
    config => !ignoredFiles.concat(['package.json']).includes(config),
  )
}

/**
 * @param {String} targetPath
 * @returns {Promise<Boolean>}
 */
async function getInjectStatus(targetPath) {
  try {
    const packageJson = await readFile(
      path.join(targetPath, 'package.json'),
      'utf8',
    )
    const { sharec } = JSON.parse(packageJson)

    if (!sharec) return false

    return !!sharec.injected
  } catch (err) {
    return false
  }
}

/**
 * @param {String} targetPath
 * @returns {Promise}
 */
async function setAsInjected(targetPath) {
  const packageJson = await readFile(
    path.join(targetPath, 'package.json'),
    'utf8',
  )

  if (!packageJson) return

  await writeFile(
    path.join(`${targetPath}/package.json`),
    JSON.stringify({
      ...JSON.parse(packageJson),
      sharec: {
        injected: true,
      },
    }),
    'utf8',
  )
}

/**
 * @param {String} basePath
 * @returns {Promise<Array<String>>}
 */
async function getConfigs(basePath) {
  // TODO: move to the separated function
  const CONFIGS_PATH = path.join(basePath, 'configs')
  const res = await readDir(CONFIGS_PATH)

  return res.filter(config => !ignoredFiles.includes(config))
}

/**
 * @param {String} basePath
 * @param {String} targetPath
 * @param {Array<String>} configs
 * @returns {Promise}
 */
async function copyConfigs(basePath, targetPath, configs) {
  const CONFIGS_PATH = path.join(basePath, 'configs')

  await Promise.all(
    filterConfigs(configs).map(config =>
      copyFile(path.join(CONFIGS_PATH, config), path.join(targetPath, config)),
    ),
  )
}

/**
 * @param {String} basePath
 * @param {Array<String>} configs
 * @returns {Promise<Object>}
 */
async function getDependenciesFromConfigs(basePath, configs) {
  if (!configs.includes('package.json')) return {}

  const dependenciesObject = {}
  const packageJson = await readFile(
    path.join(`${basePath}/configs`, 'package.json'),
    'utf8',
  )
  const { dependencies, devDependencies } = JSON.parse(packageJson)

  if (dependencies) {
    Object.assign(dependenciesObject, {
      dependencies,
    })
  }

  if (devDependencies) {
    Object.assign(dependenciesObject, {
      devDependencies,
    })
  }

  return dependenciesObject
}

/**
 * @param {String} basePath
 * @param {Object} dependenciesObject
 * @param {String} packageManager
 * @returns {Promise}
 */
async function installConfigsDependencies(
  basePath,
  dependenciesObject = {},
  packageManager = 'npm',
) {
  const allowedPackageManagers = ['npm', 'yarn']

  if (!allowedPackageManagers.includes(packageManager)) {
    throw new Error(
      `${packageManager} is not currently supported yet! Use npm or yarn instead!`,
    )
  }

  const { dependencies = {}, devDependencies = {} } = dependenciesObject
  const dependenciesKeys = Object.keys(dependencies)
  const devDependenciesKeys = Object.keys(devDependencies)

  if (dependenciesKeys.length > 0) {
    const installCommand =
      packageManager === 'yarn' ? 'yarn add' : 'npm install --save'
    const commandWithArgs = dependenciesKeys.reduce(
      (acc, key) => `${acc} ${key}@${dependencies[key]}`,
      installCommand,
    )

    await exec(commandWithArgs, {
      cwd: basePath,
    })
  }

  if (devDependenciesKeys.length > 0) {
    const installCommand =
      packageManager === 'yarn' ? 'yarn add -D' : 'npm install --save-dev'
    const commandWithArgs = devDependenciesKeys.reduce(
      (acc, key) => `${acc} ${key}@${devDependencies[key]}`,
      installCommand,
    )

    await exec(commandWithArgs, {
      cwd: basePath,
    })
  }
}

/**
 * @param {String} basePath
 * @param {String} targetPath
 * @param {Array<String>} configs
 * @returns {Promise}
 */
async function updatePackageJson(basePath, targetPath, configs) {
  if (!configs.includes('package.json')) return

  const packageJson = await readFile(
    path.join(`${targetPath}/package.json`),
    'utf8',
  )
  const packageJsonNewConfigs = await extractPackageJsonConfigs(
    basePath,
    configs,
  )
  const mergedPackageJson = mergePackageJsonConfigs(
    JSON.parse(packageJson),
    packageJsonNewConfigs,
  )

  await writeFile(
    path.join(`${targetPath}/package.json`),
    JSON.stringify(mergedPackageJson),
    'utf8',
  )
}

/**
 * @param {String} basePath
 * @param {Array<String>} configs
 * @returns {Promise}
 */
async function extractPackageJsonConfigs(basePath, configs) {
  if (!configs.includes('package.json')) return {}

  const IGNORED_FIELDS = [
    'name',
    'version',
    'description',
    'keywords',
    'homepage',
    'bugs',
    'license',
    'people',
    'files',
    'main',
    'browser',
    'bin',
    'man',
    'directories',
    'repository',
    'config',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'bundledDependencies',
    'optionalDependencies',
    'engines',
    'engineStrict',
    'os',
    'cpu',
    'preferGlobal',
    'private',
    'publishConfig',
    'author',
  ]
  const packageJson = await readFile(
    path.join(`${basePath}/configs`, 'package.json'),
    'utf8',
  )
  const parsedPackageJson = JSON.parse(packageJson)

  return Object.keys(parsedPackageJson)
    .filter(key => !IGNORED_FIELDS.includes(key))
    .reduce(
      (acc, key) =>
        Object.assign(acc, {
          [key]: parsedPackageJson[key],
        }),
      {},
    )
}

/**
 * @param {Object} packageJsonA
 * @param {Object} packageJsonB
 * @returns {Object}
 */
function mergePackageJsonConfigs(packageJsonA = {}, packageJsonB = {}) {
  const newPackageJson = { ...packageJsonA }
  const { scripts, ...newConfigs } = packageJsonB

  if (scripts) {
    Object.assign(newPackageJson, {
      scripts: {
        ...newPackageJson.scripts,
        ...scripts,
      },
    })
  }

  return Object.assign(newPackageJson, newConfigs)
}

module.exports = {
  filterConfigs,
  setAsInjected,
  getInjectStatus,
  getConfigs,
  copyConfigs,
  getDependenciesFromConfigs,
  installConfigsDependencies,
  updatePackageJson,
  extractPackageJsonConfigs,
  mergePackageJsonConfigs,
}

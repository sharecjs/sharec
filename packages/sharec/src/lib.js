const path = require('path')
const { readDir, readFile, copyFile, exec } = require('./utils')

async function getConfigs(basePath) {
  const CONFIGS_PATH = path.join(basePath, 'configs')
  const res = await readDir(CONFIGS_PATH)

  return res
}

async function getDependenciesFromConfigs(basePath, configs) {
  if (!configs.includes('package.json')) return {}

  const dependenciesObject = {}
  const packageJson = await readFile(path.join(`${basePath}/configs`, 'package.json'), 'utf8')
  const { dependencies, devDependencies } = JSON.parse(packageJson)

  if (dependencies) {
    Object.assign(dependenciesObject, {
      dependencies
    })
  }

  if (devDependencies) {
     Object.assign(dependenciesObject, {
       devDependencies
     }) 
  }

  return dependenciesObject
}

async function installConfigsDependencies(dependenciesObject = {}, packageManager = 'npm') {
  const allowedPackageManagers = ['npm', 'yarn']

  if (!allowedPackageManagers.includes(packageManager)) {
    throw new Error(`${packageManager} is not currently supported yet! Use npm or yarn instead!`)
  }

  const { dependencies = {}, devDependencies = {} } = dependenciesObject
  const dependenciesKeys = Object.keys(dependencies)
  const devDependenciesKeys = Object.keys(devDependencies)

  if (dependenciesKeys.length > 0) {
    const installCommand = packageManager === 'yarn' 
      ? 'yarn add' 
      : 'npm install --save'
    const commandWithArgs = dependenciesKeys.reduce((acc, key) => `${acc} ${key}@${dependencies[key]}`, installCommand)

    await exec(commandWithArgs)
  }

  if (devDependenciesKeys.length > 0) {
     const installCommand = packageManager === 'yarn' 
      ? 'yarn add -D' 
      : 'npm install --save-dev'
     const commandWithArgs = devDependenciesKeys.reduce((acc, key) => `${acc} ${key}@${devDependencies[key]}`, installCommand) 

     await exec(commandWithArgs)
  }
}

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
    'author'
  ]
  const packageJson = await readFile(path.join(`${basePath}/configs`, 'package.json'), 'utf8')
  const parsedPackageJson = JSON.parse(packageJson)

  return Object.keys(parsedPackageJson)
    .filter(key => !IGNORED_FIELDS.includes(key))
    .reduce((acc, key) => Object.assign(acc, {
      [key]: parsedPackageJson[key]
    }), {})
}

function mergePackageJsonConfigs(packageJsonA = {}, packageJsonB = {}) {
  const newPackageJson = {...packageJsonA}
  const {scripts, ...newConfigs} = packageJsonB

  if (scripts) {
    Object.assign(newPackageJson, {
      scripts: {
        ...newPackageJson.scripts,
        ...scripts
      }
    })
  }

  return Object.assign(newPackageJson, newConfigs)
}

module.exports = {
  getConfigs,
  getDependenciesFromConfigs,
  installConfigsDependencies,
  extractPackageJsonConfigs,
  mergePackageJsonConfigs,
}
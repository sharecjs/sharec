const omit = require('lodash/omit')
const pick = require('lodash/pick')
const path = require('path')
const { readFile } = require('../../utils/fs')

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

const getCurrentPackageJsonMetaData = async targetPath => {
  const targetPackageJsonPath = path.resolve(targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
  const targetPackageJson = JSON.parse(rawTargetPackageJson)

  return extractMetaData(targetPackageJson)
}

const extractDependencies = packageJson =>
  pick(packageJson, DEPENDENCIES_FIELDS)

const extractConfigs = packageJson => omit(packageJson, IGNORED_FIELDS)

const extractMetaData = packageJson => packageJson.sharec || null

module.exports = {
  getCurrentPackageJsonMetaData,
  extractDependencies,
  extractConfigs,
  extractMetaData,
}

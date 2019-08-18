const omit = require('lodash/omit')
const path = require('path')
const { readFile } = require('../../utils/std').fs

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
]

const getCurrentPackageJsonMetaData = async targetPath => {
  const targetPackageJsonPath = path.resolve(targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
  const targetPackageJson = JSON.parse(rawTargetPackageJson)

  return extractMetaData(targetPackageJson)
}

const extractConfigs = packageJson => omit(packageJson, IGNORED_FIELDS)

const extractMetaData = packageJson => packageJson.sharec || null

module.exports = {
  getCurrentPackageJsonMetaData,
  extractConfigs,
  extractMetaData,
}

const omit = require('lodash/omit')
const pick = require('lodash/pick')
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

/**
 * @typedef {Object} MetaData
 * @property {String} version
 * @property {String} config
 */

const extractConfigs = packageJson => omit(packageJson, IGNORED_FIELDS)

/**
 * @param {Object} packageJson
 * @returns {MetaData|null}
 */
const extractMetaData = packageJson => {
  if (!packageJson.sharec) return null

  return pick(packageJson.sharec, ['config', 'version'])
}

/**
 * @param {String} targetPath
 * @returns {MetaData|null}
 */
const getCurrentPackageJsonMetaData = async targetPath => {
  const targetPackageJsonPath = path.resolve(targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
  const targetPackageJson = JSON.parse(rawTargetPackageJson)

  return extractMetaData(targetPackageJson)
}

/**
 * @param {String} configsPath
 * @returns {MetaData}
 */
const getUpcomingPackageJsonMetaData = async configsPath => {
  const upcomingConfigsPackageJsonPath = path.resolve(
    configsPath,
    'package.json',
  )
  const rawUpcomingPackageJson = await readFile(
    upcomingConfigsPackageJsonPath,
    'utf8',
  )
  const upcomingPackageJson = JSON.parse(rawUpcomingPackageJson)

  return {
    config: upcomingPackageJson.name,
    version: upcomingPackageJson.version,
  }
}

module.exports = {
  extractConfigs,
  extractMetaData,
  getCurrentPackageJsonMetaData,
  getUpcomingPackageJsonMetaData,
}

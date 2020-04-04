const path = require('path')
const get = require('lodash/get')
const slash = require('slash')
const { readFile } = require('../utils/std').fs
const { find } = require('../utils/fs')

const readCache = spinner => async input => {
  const { targetPackage, targetPath } = input
  const previousTargetMeta = get(targetPackage, 'sharec', null)

  if (!previousTargetMeta) return input

  const { config, version } = previousTargetMeta
  const cacheBasePath = slash(path.join(targetPath, `node_modules/.cache/sharec/${config}/${version}`))

  spinner.frame(`reading cache for ${config}/${version}`)

  return find(cacheBasePath, '**/*')
    .then(async cachedFiles => {
      if (cachedFiles.length === 0) return input

      input.cache = {}

      for (const configPath of cachedFiles) {
        const configKey = configPath.replace(cacheBasePath, '').replace(/^\//, '')
        const cachedConfig = await readFile(configPath, 'utf8')

        input.cache[configKey] = cachedConfig
      }

      spinner.frame('cache was readed')

      return input
    })
    .catch(err => {
      if (err.message.includes('ENOENT')) {
        spinner.frame('cache was not found, skipping')

        return input
      }

      spinner.fail('Cache was not readed due unexpected error')

      throw err
    })
}

module.exports = readCache

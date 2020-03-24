const path = require('path')
const get = require('lodash/get')
const { readFile } = require('../utils/std').fs
const { find } = require('../utils/fs')

const readCache = async input => {
  const { targetPackage, targetPath } = input
  const previousTargetMeta = get(targetPackage, 'sharec', null)

  if (!previousTargetMeta) return input

  const { config, version } = previousTargetMeta
  const cacheBasePath = path.join(
    targetPath,
    `node_modules/.cache/sharec/${config}/${version}`,
  )

  return find(cacheBasePath, '**/*')
    .then(async cachedFiles => {
      if (cachedFiles.length === 0) return input

      input.cache = {}

      for (const configPath of cachedFiles) {
        const configKey = configPath
          .replace(cacheBasePath, '')
          .replace(/^\//, '')
        const cachedConfig = await readFile(configPath, 'utf8')

        input.cache[configKey] = cachedConfig
      }

      return input
    })
    .catch(err => {
      if (err.message.includes('ENOENT')) return input

      throw err
    })
}

module.exports = readCache

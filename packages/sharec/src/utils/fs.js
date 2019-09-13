const { join } = require('path')
const { makeDir, readDir, lstat } = require('./std').fs
const slash = require('slash')

/**
 * @param {String} paths
 * @returns {String}
 */
const normalizePathSlashes = paths => paths.map(el => slash(el))

/**
 * @param {String} path
 * @returns {Promise<void>}
 */
const safeMakeDir = async path => {
  try {
    await makeDir(path, {
      recursive: true,
    })
  } catch (err) {}
}

/**
 * @param {String} options.path
 * @param {RegExp} options.pattern
 * @param {Boolean} options.root
 * @returns {String[]}
 */
const flatSearch = async ({ path, pattern, root = true }) => {
  const filesList = await readDir(path)
  const result = []

  if (filesList.length === 0) {
    return result
  }

  for (const file of filesList) {
    const fullFilePath = join(path, file)
    const stats = await lstat(fullFilePath)

    if (stats.isFile()) {
      result.push(fullFilePath)
    } else {
      const subFiles = await flatSearch({
        path: fullFilePath,
        root: false,
        pattern,
      })

      result.push(...subFiles)
    }
  }

  const filteredResult = !pattern
    ? result
    : result.filter(file => pattern.test(file))

  if (!root) return filteredResult

  return normalizePathSlashes(
    filteredResult.map(file =>
      file.replace(new RegExp(`^${path}`), '').replace(/^(\/|\\)/, ''),
    ),
  )
}

module.exports = {
  normalizePathSlashes,
  safeMakeDir,
  flatSearch,
}

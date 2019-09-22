const { join } = require('path')
const { readFile, makeDir, readDir, lstat } = require('./std').fs
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
 * @param {String} path
 * @returns {Promise<void>}
 */
const safeReadFile = async path => {
  try {
    return await readFile(path, 'utf8')
  } catch (err) {
    return null
  }
}

/**
 * @param {String} options.path
 * @param {RegExp} options.pattern
 * @param {Boolean} options.root
 * @returns {String[]}
 */
const flatSearch = async ({ path, pattern, root = true }) => {
  const result = []
  let filesList = []

  try {
    filesList = await readDir(path)
  } catch (err) {
    return result
  }

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

  const normalizedPath = slash(path)

  return filteredResult.map(file => {
    const normalizedFilePath = slash(file)

    return normalizedFilePath
      .replace(new RegExp(`^${normalizedPath}`), '')
      .replace(/^\//, '')
  })
}

module.exports = {
  normalizePathSlashes,
  safeReadFile,
  safeMakeDir,
  flatSearch,
}

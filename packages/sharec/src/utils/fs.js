const { join } = require('path')
const nanomatch = require('nanomatch')
const slash = require('slash')
const { readFile, makeDir, readDir, lstat } = require('./std').fs

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

  return filteredResult.map(file =>
    slash(file)
      .replace(normalizedPath, '')
      .replace(/^(\/|\\)/, ''),
  )
}

const find = async (path, pattern) => {
  let result = []
  const subresult = await readDir(path)

  if (subresult.length === 0) return result

  for (const file of subresult) {
    const fullFilePath = join(path, file)
    const stats = await lstat(fullFilePath)

    if (stats.isFile()) {
      result.push(
        ...nanomatch([fullFilePath], pattern, {
          dot: true,
        }),
      )
      continue
    }

    const subFiles = await find(fullFilePath, pattern)

    result.push(...subFiles)
  }

  return result
}

module.exports = {
  normalizePathSlashes,
  safeReadFile,
  safeMakeDir,
  flatSearch,
  find,
}

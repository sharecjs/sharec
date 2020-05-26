const nanomatch = require('nanomatch')
const { makeDir, readDir, lstat } = require('./std').fs
const { join } = require('../utils/std').path

/**
 * Makes directory with standard makeDir, but do not throws
 * any exceptions
 * @param {String} path Path to new directory
 * @returns {Promise<void>}
 */
const safeMakeDir = async (path) => {
  try {
    await makeDir(path, {
      recursive: true,
    })
  } catch (err) {}
}

/**
 * Find all files by given pattern in all directories located by
 * given path
 * @example
 * await find('.', '*') // will find all files in current dir
 * await find('.', '*.js') // will find all *.js files in current dir
 * @param {String} path Target path
 * @param {String} pattern Matching pattern
 * @returns {Promise<Array<String>>}
 */
const find = async (path, pattern) => {
  const result = []
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

    // recursive search in nested directories
    const subFiles = await find(fullFilePath, pattern)

    result.push(...subFiles)
  }

  return result
}

module.exports = {
  safeMakeDir,
  find,
}

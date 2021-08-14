// @ts-check
const nanomatch = require('sharec-nanomatch')
const { makedir, readdir, lstat, open, close, read } = require('./std')
const { join } = require('./path')

/**
 * Makes directory with standard makedir, but do not throws
 * any exceptions
 * @param {string} path Path to new directory
 * @returns {Promise<void>}
 */
const safeMakeDir = async (path) => {
  try {
    await makedir(path, {
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
 * @param {string} path Target path
 * @param {string} pattern Matching pattern
 * @returns {Promise<string[]>}
 */
const find = async (path, pattern) => {
  const result = []
  const subresult = await readdir(path)

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

/**
 * Read data from a file
 * @param {string} path Path of the file
 * @param {number} size Size of the data to read
 * @param {number} offset
 * @returns {Promise<Buffer>}
 */
const readBuffer = async (path, size, offset = 0) => {
  const buffer = Buffer.alloc(size)
  const fd = await open(path, 'r')

  try {
    await read(fd, buffer, offset, size, 0)

    return buffer
  } finally {
    await close(fd)
  }
}

module.exports = {
  safeMakeDir,
  find,
  readBuffer,
}

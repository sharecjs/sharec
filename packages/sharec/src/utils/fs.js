const nanomatch = require('nanomatch')
const { makeDir, readDir, lstat } = require('./std').fs
const { join } = require('../utils/std').path

/**
 * @param {String} path
 * @returns {Promise<void>}
 */
const safeMakeDir = async (path) => {
  try {
    await makeDir(path, {
      recursive: true,
    })
  } catch (err) {}
}

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

    const subFiles = await find(fullFilePath, pattern)

    result.push(...subFiles)
  }

  return result
}

module.exports = {
  safeMakeDir,
  find,
}

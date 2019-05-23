// TODO: cool idea!
const path = require('path')
const { readDir, makeDir, readFile, writeFile } = require('./index')

const writeFixture = async (basePath, fileName, content) => {
  const dirs = await readDir(basePath)

  if (!dirs.includes('fixtures')) {
    await makeDir('./fixtures')
  }

  await writeFile(
    path.join(basePath, 'fixtures', fileName),
    content instanceof Object ? JSON.stringify(content, null, 2) : content,
    'utf8',
  )
}

const readFixture = async (basePath, fileName) => {
  const dirs = await readDir(basePath)

  if (!dirs.includes('fixtures')) {
    return null
  }

  try {
    const res = await readFile(path.join(basePath, 'fixtures', fileName))

    return res
  } catch (err) {
    return null
  }
}

module.exports = {
  writeFixture,
  readFixture,
}

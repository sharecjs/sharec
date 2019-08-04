const path = require('path')
const fg = require('fast-glob')
const { readFile } = require('../../utils/fs')

async function collectFiles(targetPath) {
  const files = {}
  const filesList = await fg(`${targetPath}/**/*`, {
    ignore: ['**/node_modules', '**/package-lock.json', 'yarn.lock'],
    dot: true,
  })

  for (const filePath of filesList) {
    const fileSource = await readFile(filePath, 'utf8')

    Object.assign(files, {
      [filePath.replace(targetPath, '')]: {
        fileName: path.basename(filePath),
        fullPath: filePath,
        source: fileSource,
      },
    })
  }

  return files
}

module.exports = {
  collectFiles,
}

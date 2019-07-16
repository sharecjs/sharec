const path = require('path')
const { readDir, readFile, writeFile, makeDir } = require('../utils/fs')

async function init(targetPath) {
  const targetPackageJsonPath = path.join(targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
  const { scripts = {}, ...targetPackageJson } = JSON.parse(
    rawTargetPackageJson,
  )
  const updatedPackageJson = { ...targetPackageJson }
  const targetFiles = await readDir(targetPath)
  const hooks = {
    postinstall: 'sharec install',
    preuninstall: 'sharec remove',
  }

  Object.assign(updatedPackageJson, {
    scripts: {
      ...scripts,
      ...hooks,
    },
  })

  if (!targetFiles.includes('configs')) {
    await makeDir(path.join(targetPath, './configs'))
  }

  await writeFile(
    targetPackageJsonPath,
    JSON.stringify(updatedPackageJson, null, 2),
    'utf8',
  )
}

module.exports = init

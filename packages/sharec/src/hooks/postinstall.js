const path = require('path')
const { readFile, writeFile } = require('../utils/fs')

async function postinstall(targetPath) {
  const targetPackageJsonPath = path.join(targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
  const { scripts, ...targetPackageJson } = JSON.parse(rawTargetPackageJson)
  const updatedPackageJson = { ...targetPackageJson, scripts }
  const hooks = {
    postinstall: 'sharec install',
    preuninstall: 'sharec remove',
  }

  // TODO: optimize this moment
  updatedPackageJson.scripts = {
    ...scripts,
    ...hooks,
  }

  await writeFile(
    targetPackageJsonPath,
    JSON.stringify(updatedPackageJson, null, 2),
    'utf8',
  )
}

module.exports = postinstall

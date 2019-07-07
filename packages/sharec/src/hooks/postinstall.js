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

  if (!scripts) {
    updatedPackageJson.scripts = hooks
  } else if (
    !scripts.postinstall ||
    scripts.postinstall !== hooks.postinstall
  ) {
    updatedPackageJson.scripts.postinstall = hooks.postinstall
  } else if (
    !scripts.preuninstall ||
    scripts.preuninstall !== hooks.preuninstall
  ) {
    updatedPackageJson.scripts.preuninstall = hooks.preuninstall
  } else {
    return
  }

  await writeFile(
    targetPackageJsonPath,
    JSON.stringify(updatedPackageJson, null, 2),
    'utf8',
  )
}

module.exports = postinstall

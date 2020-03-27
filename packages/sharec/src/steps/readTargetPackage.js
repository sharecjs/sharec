const path = require('path')
const { readFile } = require('../utils/std').fs

const readTargetPackage = spinner => async input => {
  try {
    const targetPackageJsonPath = path.resolve(input.targetPath, 'package.json')
    const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
    const targetPackage = JSON.parse(rawTargetPackageJson)

    return Object.assign(input, {
      targetPackage,
    })
  } catch (err) {
    // TODO:
    throw err
  }
}

module.exports = readTargetPackage

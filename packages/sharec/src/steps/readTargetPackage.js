const path = require('path')
const { readFile } = require('../utils/std').fs

const readTargetPackage = spinner => async input => {
  try {
    spinner.frame('Reading package.json from target project')

    const targetPackageJsonPath = path.resolve(input.targetPath, 'package.json')
    const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
    const targetPackage = JSON.parse(rawTargetPackageJson)

    spinner.succeed("Target package's package.json was readed")

    return Object.assign(input, {
      targetPackage,
    })
  } catch (err) {
    spinner.fail("Target project's package.json was not readed")
    // TODO:
    throw err
  }
}

module.exports = readTargetPackage

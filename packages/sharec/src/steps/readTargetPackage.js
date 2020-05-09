const { readFile } = require('../utils/std').fs
const { resolve } = require('../utils/std').path

const readTargetPackage = (spinner) => async (input) => {
  try {
    spinner.frame('reading package.json from target project')

    const targetPackageJsonPath = resolve(input.targetPath, 'package.json')
    const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
    const targetPackage = JSON.parse(rawTargetPackageJson)

    spinner.frame("target package's package.json was readed")

    return Object.assign(input, {
      targetPackage,
    })
  } catch (err) {
    spinner.fail("Target project's package.json was not readed")
    throw err
  }
}

module.exports = readTargetPackage

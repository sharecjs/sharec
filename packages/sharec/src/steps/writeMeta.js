const path = require('path')
const get = require('lodash/get')
const { writeFile, readFile } = require('../utils/std').fs

const writeMeta = async input => {
  const disappear = get(input, 'options.disappear')

  if (disappear) return input

  const { name, version } = input.upcomingPackage
  const targetPackagePath = path.join(input.targetPath, 'package.json')
  const rawTargetPackagePath = await readFile(targetPackagePath, 'utf8')
  let targetPackage = JSON.parse(rawTargetPackagePath)

  targetPackage.sharec = {
    config: name,
    version,
  }

  await writeFile(targetPackagePath, JSON.stringify(targetPackage, null, 2))

  return input
}

module.exports = writeMeta

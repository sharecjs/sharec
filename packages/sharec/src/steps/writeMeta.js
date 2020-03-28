const path = require('path')
const get = require('lodash/get')
const { writeFile, readFile } = require('../utils/std').fs

const writeMeta = spinner => async input => {
  const disappear = get(input, 'options.disappear')

  if (disappear) return input

  spinner.frame('writing sharec meta data to target package')

  const { name, version } = input.upcomingPackage
  const targetPackagePath = path.join(input.targetPath, 'package.json')
  const rawTargetPackagePath = await readFile(targetPackagePath, 'utf8')
  let targetPackage = JSON.parse(rawTargetPackagePath)

  targetPackage.sharec = {
    config: name,
    version,
  }

  await writeFile(targetPackagePath, JSON.stringify(targetPackage, null, 2))

  spinner.frame('sharec meta data was writed')

  return input
}

module.exports = writeMeta

const chalk = require('chalk')
const diff = require('diff')

function createFilesDiff({ fixtureFile, targetFile }) {
  const filesDiff = diff.diffChars(targetFile.source, fixtureFile.source)

  if (!filesDiff || filesDiff.length === 0) {
    return null
  }

  const outputDiff = filesDiff.reduce((acc, part) => {
    if (part.added) {
      return acc + chalk.bgGreen(chalk.black(part.value))
    } else if (part.removed) {
      return acc + chalk.bgRed(chalk.black(part.value))
    }

    return acc + part.value
  }, '')

  return {
    fullPath: targetFile.fullPath,
    output: outputDiff,
  }
}

module.exports = {
  createFilesDiff,
}

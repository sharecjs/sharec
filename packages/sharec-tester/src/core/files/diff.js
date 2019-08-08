const chalk = require('chalk')
const diff = require('diff')

function fitSourceLines({lines, fitCount}) {
  if (lines.length >= fitCount) return lines

  return lines.concat(new Array(fitCount - lines.length).fill(''))
}

function fuseDiffShards(shards) {
  let result = {
    isAdded: false,
    isRemoved: false,
    value: ''
  }

  shards.forEach(shard => {
    if (shard.added) {
      result.isAdded = true
      result.value += chalk`{bgGreen {black ${shard.value}}}`
    } else if (shard.removed) {
      result.isRemoved = true
      result.value += chalk`{bgRed {black ${shard.value}}}`
    } else {
      result.value += shard.value
    }
  })

  return result
}

function createFilesDiff({ fixtureFile, targetFile }) {
  const fixtureLines = fixtureFile.source.split('\n')
  const targetLines = targetFile.source.split('\n')
  const fittedFixtureLines = fitSourceLines({ lines: fixtureLines, fitCount: targetLines.length })
  const fittedTargetLines = fitSourceLines({ lines: targetLines, fitCount: fixtureLines.length })
  const linesWithDiff = []

  for (let i = 0; i < fittedFixtureLines.length; i++) {
    const currentLinesDiff = diff.diffChars(fittedFixtureLines[i], fittedTargetLines[i])
    const { value, isAdded, isRemoved } = fuseDiffShards(currentLinesDiff)

    if (isAdded && isRemoved) {
      linesWithDiff.push(chalk` {yellow ±} ${i}:  ${value}`)
    } else if (isAdded) {
      linesWithDiff.push(chalk` {green +} ${i}:  ${value}`)
    } else if (isRemoved) {
      linesWithDiff.push(chalk` {red -} ${i}:  ${value}`)
    } else {
      linesWithDiff.push(`   ${i}:  ${value}`)
    }
  }

  return {
    fullPath: targetFile.fullPath,
    output: linesWithDiff.join('\n'),
  }
}

module.exports = {
  fitSourceLines,
  createFilesDiff,
}

const path = require('path')
const createSpinner = require('./core/messages/spinner')
const { printConfigDiff } = require('./core/messages/diff')
const { collectFiles } = require('./core/files/collect')
const { createFilesDiff } = require('./core/files/diff')

async function tester({ initPath, targetPath, fixturesPath }) {
  const spinner = createSpinner('collecting files...')

  spinner.start()

  const targetFullPath = path.join(initPath, targetPath)
  const fixturesFullPath = path.join(initPath, fixturesPath)
  const targetFiles = await collectFiles(targetFullPath)
  const fixturesFiles = await collectFiles(fixturesFullPath)
  const configsDiff = []

  spinner.frame('collecting diff from files...')

  Object.keys(fixturesFiles).forEach(key => {
    if (!targetFiles[key]) return

    const diff = createFilesDiff({
      targetFile: targetFiles[key],
      fixtureFile: fixturesFiles[key],
    })

    if (!diff) return

    configsDiff.push(diff)
  })

  if (configsDiff.length === 0) {
    spinner.succeed('all configs matched.')
    process.exit(0)
  }

  spinner.fail(`${configsDiff.length} failed!`)

  configsDiff.forEach((config, i) => {
    printConfigDiff(config)
    console.log('\n')
  })

  process.exit(1)
}

module.exports = tester

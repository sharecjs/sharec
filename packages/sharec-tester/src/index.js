const path = require('path')
const fg = require('fast-glob')
const chalk = require('chalk')
const diff = require('diff')
const createSpinner = require('./core/messages/spinner')
const { readFile } = require('./utils/fs')

async function collectFiles(targetPath) {
  const files = {}
  const filesList = await fg(`${targetPath}/**/*`, {
    ignore: ['**/node_modules', '**/package-lock.json', 'yarn.lock'],
    dot: true,
  })

  for (const filePath of filesList) {
    const fileSource = await readFile(filePath, 'utf8')

    Object.assign(files, {
      [filePath.replace(targetPath, '')]: {
        fileName: path.basename(filePath),
        fullPath: filePath,
        source: fileSource,
      },
    })
  }

  return files
}

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

    const filesDiff = diff.diffChars(
      targetFiles[key].source,
      fixturesFiles[key].source,
    )

    if (!filesDiff || filesDiff.length === 0) return

    const outputDiff = filesDiff.reduce((acc, part) => {
      if (part.added) {
        return acc + chalk.bgGreen(chalk.black(part.value))
      } else if (part.removed) {
        return acc + chalk.bgRed(chalk.black(part.value))
      }

      return acc + part.value
    }, '')

    configsDiff.push({
      fullPath: targetFiles[key].fullPath,
      output: outputDiff,
    })
  })

  if (configsDiff.length === 0) {
    spinner.succeed('all configs matched.')
    process.exit(0)
  }

  spinner.fail(`${configsDiff.length} failed!`)

  console.log('\n')

  configsDiff.forEach((config, i) => {
    console.info(`${chalk.underline(config.fullPath)}\n`)
    console.info('Difference:\n')
    console.info(config.output)

    if (i !== configsDiff.length - 1) {
      console.log('\n')
    }
  })

  process.exit(1)
}

module.exports = tester

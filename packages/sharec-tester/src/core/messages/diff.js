const chalk = require('chalk')

function printConfigDiff(config) {
  console.info(`${chalk.underline(config.fullPath)}\n`)
  console.info('Difference:\n')
  console.info(config.output)
}

module.exports = {
  printConfigDiff,
}

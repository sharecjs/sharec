const boxen = require('boxen')
const chalk = require('chalk')

const installed = () => {
  console.info(
    boxen(
      [
        `${chalk.bold('sharec')}: configuration was installed!`,
        `For update dependencies run: ${chalk.blue('npm i')}`,
        'Have a nice time!',
      ].join('\n'),
      {
        padding: 1,
        align: 'center',
      },
    ),
  )
}

module.exports = {
  installed,
}

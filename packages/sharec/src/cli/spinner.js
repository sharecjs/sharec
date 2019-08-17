const ora = require('ora')

const createSpinner = ({ text, silent }) => {
  const spinner = ora({
    spinner: 'line',
    prefixText: 'sharec:',
    interval: 50,
    text,
  })

  return {
    start: () => {
      if (silent) return

      spinner.start()
    },

    succeed: text => {
      if (silent) return

      spinner.succeed(text)
    },

    fail: text => {
      if (silent) return

      spinner.fail(text)
    },
  }
}

module.exports = createSpinner

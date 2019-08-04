const ora = require('ora')

const createSpinner = ({ text, silent }) => {
  const spinner = ora({
    spinner: 'line',
    prefixText: 'sharec-tester:',
    interval: 50,
    text,
  })

  return {
    frame: text => {
      spinner.text = text
    },

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

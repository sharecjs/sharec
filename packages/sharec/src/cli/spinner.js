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
      if (silent) {
        return spinner
      }

      spinner.start()

      return spinner
    },

    succeed: text => {
      if (silent) {
        return spinner
      }

      spinner.succeed(text)

      return spinner
    },

    fail: text => {
      if (silent) {
        return spinner
      }

      spinner.fail(text)

      return spinner
    },

    frame: text => {
      if (silent) {
        return spinner
      }

      spinner.text = text

      return spinner
    },
  }
}

module.exports = createSpinner

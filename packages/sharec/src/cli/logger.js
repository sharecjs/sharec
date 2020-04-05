const { bold } = require('chalk')

const createLogger = ({ prefix = '', silent }) => {
  let logPrefixParts = ['sharec', ':']

  if (prefix) {
    logPrefixParts.splice(1, 0, ` [${prefix}]`)
  }

  const logPrefix = bold(logPrefixParts.join(''))

  const logger = {
    wrap: (fn, fnId = '') => (...params) => {
      if (silent) return fn(...params)
      if (params.length === 0) return fn(...params)

      params.forEach((param, i) => {
        console.dir(logPrefix, bold(`${fn.name || fnId}(arg[${i}]): \n`), param)
      })

      return fn(...params)
    },

    log: (...entries) => {
      if (silent) return

      console.dir(logPrefix, ...entries)
    },
  }

  return logger
}

module.exports = createLogger

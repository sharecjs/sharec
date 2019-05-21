const execute = () =>
  new Promise(resolve => {
    setTimeout(() => {
      return resolve()
    }, 1500)
  })

module.exports = execute

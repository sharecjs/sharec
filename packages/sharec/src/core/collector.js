const collect = () =>
  new Promise(resolve => {
    setTimeout(() => {
      return resolve()
    }, 1500)
  })

module.exports = collect

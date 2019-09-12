const transformJSONInput = (...args) =>
  args.map(arg => {
    if (!arg) return arg

    if (typeof arg === 'string') {
      return JSON.parse(arg)
    }

    return arg
  })

module.exports = {
  transformJSONInput,
}

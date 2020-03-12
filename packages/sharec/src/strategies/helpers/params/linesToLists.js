function linesToLists(params) {
  return Object.keys(params).reduce(
    (acc, key) =>
      Object.assign(acc, {
        [key]:
          typeof params[key] === 'string'
            ? params[key].split(/\n/gm)
            : params[key],
      }),
    {},
  )
}

module.exports = linesToLists

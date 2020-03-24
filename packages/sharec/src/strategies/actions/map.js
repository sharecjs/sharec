const map = (...mappers) => filename => {
  const mapper = mappers.find(mapper => {
    if (mapper[0] instanceof RegExp) {
      return mapper[0].test(filename)
    }

    return mapper[0] === filename
  })

  if (!mapper) return null

  return mapper[1]
}

module.exports = map

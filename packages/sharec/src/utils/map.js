const pick = (target, keys) => {
  const result = new Map()

  target.forEach((value, key) => {
    if (!keys.includes(key)) return

    result.set(key, value)
  })

  return result
}

const pickBy = (target, predicate) => {
  const result = new Map()

  target.forEach((value, key) => {
    if (!predicate(value, key)) return

    result.set(key, value)
  })

  return result
}

const omit = (target, keys) => {
  const result = new Map(target)

  target.forEach((value, key) => {
    if (!keys.includes(key)) return

    result.delete(key)
  })

  return result
}

const omitBy = (target, predicate) => {
  const result = new Map(target)

  target.forEach((value, key) => {
    if (!predicate(value, key)) return

    result.delete(key)
  })

  return result
}

module.exports = {
  pick,
  omit,
  pickBy,
  omitBy,
}

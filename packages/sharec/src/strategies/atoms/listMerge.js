const listMergeAtom = atom => ({ current, upcoming }) => {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming

  const resultLength = Math.max(current.length, upcoming.length)
  let result = new Array(resultLength)
  let i = 0

  while (i < result.length) {
    if (!current[i] && upcoming[i]) {
      result[i] = upcoming[i]
      continue
    }

    if (current[i] && !upcoming[i]) {
      result[i] = current[i]
      continue
    }

    result[i] = atom({
      current: current[i],
      upcoming: upcoming[i],
    })

    i++
  }

  return result
}

module.exports = listMergeAtom

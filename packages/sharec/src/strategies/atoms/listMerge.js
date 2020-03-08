const listMergeAtom = atom => ({ current, upcoming, cached }) => {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming

  const resultLength = Math.max(current.length, upcoming.length)
  let result = new Array(resultLength)

  for (let i = 0; i < result.length; i++) {
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
      cached: cached && cached[i],
    })
  }

  return result
}

module.exports = listMergeAtom

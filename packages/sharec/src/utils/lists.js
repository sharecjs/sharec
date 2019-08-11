const uniq = require('lodash/uniq')

const mergeLists = (a, b) => uniq(a.concat(b))

const listsDiff = (a, b) => a.filter(item => !b.includes(item))

const normalizeList = list => {
  const normalizedList = []

  for (const idx in list) {
    normalizedList.push(list[idx])
  }

  return normalizedList
}

module.exports = {
  mergeLists,
  listsDiff,
  normalizeList,
}

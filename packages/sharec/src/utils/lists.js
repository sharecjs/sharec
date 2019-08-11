const uniq = require('lodash/uniq')

function mergeLists(a, b) {
  return uniq(a.concat(b))
}

function listsDiff(a, b) {
  return a.filter(item => !b.includes(item))
}

module.exports = {
  mergeLists,
  listsDiff,
}

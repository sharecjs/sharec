const uniq = require('lodash/uniq')

const mergeLists = (a, b) => uniq(a.concat(b))

const listsDiff = (a, b) => a.filter(item => !b.includes(item))

module.exports = {
  mergeLists,
  listsDiff,
}

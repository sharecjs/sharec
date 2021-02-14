const isEqual = require('lodash/isEqual')
const uniqWith = require('lodash/uniqWith')

function listConcatAtom({ current, upcoming }) {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming

  return uniqWith([...current, ...upcoming], isEqual)
}

module.exports = listConcatAtom

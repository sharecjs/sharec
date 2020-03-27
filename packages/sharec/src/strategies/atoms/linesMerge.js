const flow = require('lodash/flow')
const { trimEOF, linesToLists } = require('../helpers/params')
const listMergeAtom = require('./listMerge')
const primitiveAtom = require('./primitive')

function linesMergeAtom(params) {
  const { current, upcoming } = params

  if (current === undefined && upcoming) return upcoming
  if (current && upcoming === undefined) return current

  const result = listMergeAtom(primitiveAtom)(
    flow(
      trimEOF,
      linesToLists,
    )(params),
  )

  return result.join('\n')
}

module.exports = linesMergeAtom

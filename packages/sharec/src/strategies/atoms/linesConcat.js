const flow = require('lodash/flow')
const { trimEOF, linesToLists } = require('../helpers/params')
const listConcatAtom = require('./listConcat')

function linesConcatAtom(params) {
  const { current, upcoming } = params

  if (current === undefined && upcoming) return upcoming
  if (current && upcoming === undefined) return current

  const result = listConcatAtom(
    flow(
      trimEOF,
      linesToLists,
    )(params),
  )

  return result.join('\n')
}

module.exports = linesConcatAtom

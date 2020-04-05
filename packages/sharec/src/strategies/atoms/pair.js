const isEqual = require('lodash/isEqual')
const primitiveAtom = require('./primitive')
const hashAtom = require('./hash')

function pairAtom(params) {
  const { current, upcoming, cached } = params

  if (current === undefined && upcoming) return upcoming
  if (current && upcoming === undefined) return current
  if (cached !== undefined && !isEqual(current, cached)) return current
  if (typeof current !== typeof upcoming) return upcoming
  if (typeof current === 'string') return primitiveAtom(params)

  if (current[0] !== upcoming[0]) {
    return upcoming
  }

  return [
    current[0],
    hashAtom({
      current: current[1],
      upcoming: upcoming[1],
      cached: cached && cached[1],
    }),
  ]
}

module.exports = pairAtom

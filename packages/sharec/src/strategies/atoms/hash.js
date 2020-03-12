const omit = require('lodash/omit')
const { hashWithoutUnchangedFields } = require('../../utils/hashes')

function hashAtom({ current, upcoming, cached }) {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming

  if (cached !== undefined) {
    const fieldsChangedByUser = Object.keys(
      hashWithoutUnchangedFields(cached, current),
    )
    const actualUpdates = omit(upcoming, fieldsChangedByUser)

    return {
      ...current,
      ...actualUpdates,
    }
  }

  return {
    ...current,
    ...upcoming,
  }
}

module.exports = hashAtom

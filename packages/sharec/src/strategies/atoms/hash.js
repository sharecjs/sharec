const omit = require('lodash/omit')
const { hashWithoutUnchangedFields } = require('../../utils/hashes')

function hashStrategy({ current, upcoming, cached }) {
  if (current && !upcoming) return current
  if (!current && upcoming) return upcoming

  if (cached) {
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

module.exports = hashStrategy

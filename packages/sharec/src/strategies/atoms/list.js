const isEqual = require('lodash/isEqual')

function listAtom({ current, upcoming, cached }) {
  if (current && !upcoming) return current
  if (!current && upcoming) return upcoming

  let result = [...current]

  upcoming.forEach((item, i) => {
    if (!isEqual(current[i], cached[i])) return
    if (isEqual(current[i], upcoming[i])) return

    result[i] = upcoming[i]
  })

  return result
}

module.exports = listAtom

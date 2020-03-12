const eofRegexp = /(\n|\n\r)$/

function trimEOF(params) {
  return Object.keys(params).reduce(
    (acc, key) =>
      Object.assign(acc, {
        [key]: eofRegexp.test(params[key])
          ? params[key].replace(eofRegexp, '')
          : params[key],
      }),
    {},
  )
}

module.exports = trimEOF

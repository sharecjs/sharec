const { resolve } = require('path')
const { readFileSync } = require.requireActual('fs')

/**
 * Returns fixture by given path
 * @param {String} path Path to fixture from test fixtures folder root
 * @param {String} format Fixture format. If it is not passed – returns fixture as
 *  string in UTF8
 * @returns {String|Object|Array}
 */
function fixture(path, format) {
  const fixturePath = resolve(__dirname, `../fixtures/${path}`)
  const file = readFileSync(fixturePath, 'utf8')

  if (format === 'json') {
    return JSON.parse(file)
  }

  return file
}

module.exports = {
  fixture,
}

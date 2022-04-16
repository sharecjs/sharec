const { EOL } = require('os')
const { resolve, join } = require('path')
const { readFileSync, readdirSync } = jest.requireActual('fs')
const json8 = require('json8')
const zipObject = require('lodash/zipObject')
const pickBy = require('lodash/pickBy')

const cutEOL = (str) => str.replace(new RegExp(`${EOL}$`), '')

/**
 * Returns fixtures set from given directory
 * If some file is not exists – skip it
 * @example
 * fixtures('common/01-base')
 * // Will return
 * {
 *   current: '...',
 *   upcoming: '...',
 *   result: '...',
 *   cached: '...',
 * }
 * When file has EOL – cuts it away
 * @param {string} path Path to fixtures folder from test fixtures folder root
 * @param {string} [format] Fixture format. If it is not passed – returns fixture as
 *  string in UTF8
 * @returns {object}
 */
const fixtures = (path, format) => {
  const findFixtureFileByKey = (arr, key) => arr.find((item) => new RegExp(`^${key}`).test(item))
  const fixturesPath = resolve(__dirname, `../fixtures/${path}`)
  const files = readdirSync(fixturesPath)
  const fixturesKeys = ['current', 'upcoming', 'result', 'restored', 'cached', 'uncached']
  const fixturesValues = fixturesKeys.map((key) => {
    const fixtureFileName = findFixtureFileByKey(files, key)

    if (!fixtureFileName) return null

    const fixturePath = join(fixturesPath, fixtureFileName)
    const file = readFileSync(fixturePath, 'utf8')

    switch (format) {
      case 'json':
        return JSON.parse(file)
      case 'map':
        return json8.parse(file, { map: true })
      default:
        return cutEOL(file)
    }
  })

  const fixturesSet = zipObject(fixturesKeys, fixturesValues)

  return pickBy(fixturesSet)
}

module.exports = {
  fixtures,
  cutEOL,
}

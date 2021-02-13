const { resolve, join } = require('path')
const { readFileSync, readdirSync } = require.requireActual('fs')
const json8 = require('json8')
const zipObject = require('lodash/zipObject')
const pickBy = require('lodash/pickBy')

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
 * @param {String} path Path to fixtures folder from test fixtures folder root
 * @param {String} [format] Fixture format. If it is not passed – returns fixture as
 *  string in UTF8
 * @returns {Object}
 */
function fixtures(path, format) {
  const findFixtureFileByKey = (arr, key) => arr.find((item) => new RegExp(`^${key}`).test(item))
  const fixturesPath = resolve(__dirname, `../fixtures/${path}`)
  const files = readdirSync(fixturesPath)
  const fixturesKeys = ['current', 'upcoming', 'result', 'restored', 'cached', 'uncached']
  const fixturesValues = fixturesKeys.map((key) => {
    const fixtureFileName = findFixtureFileByKey(files, key)

    if (!fixtureFileName) return null

    const fixturePath = join(fixturesPath, fixtureFileName)
    const file = readFileSync(fixturePath, 'utf8')

    if (format === 'json') return JSON.parse(file)
    if (format === 'map') return json8.parse(file, { map: true })

    return file.replace(/\n$/, '')
  })

  const fixturesSet = zipObject(fixturesKeys, fixturesValues)

  return pickBy(fixturesSet)
}

function createFakeSpinner() {
  const spinner = {
    start: jest.fn().mockImplementation(() => spinner),
    succeed: jest.fn().mockImplementation(() => spinner),
    fail: jest.fn().mockImplementation(() => spinner),
    frame: jest.fn().mockImplementation(() => spinner),
  }

  return spinner
}

function createFakePrompt() {
  const prompt = {
    confirm: jest.fn().mockResolvedValue(true),
  }

  return prompt
}

module.exports = {
  createFakePrompt,
  createFakeSpinner,
}

module.exports = {
  fixtures,
  createFakeSpinner,
  createFakePrompt,
}

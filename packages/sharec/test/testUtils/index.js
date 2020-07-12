const { resolve, join } = require('path')
const { readFileSync, readdirSync } = require.requireActual('fs')
const json8 = require('json8')
const zipObject = require('lodash/zipObject')
const pickBy = require('lodash/pickBy')

/**
 * Fixtures files set mapped by potential state
 * All fields are optional!
 * @typedef {Object} Fixtures
 * @property {String} [current] Current file state fixture
 * @property {String} [upcoming] Upcoming file state fixture
 * @property {String} [result] File state fixture after merge
 * @property {String} [restored] File state fixture after unapply
 * @property {String} [cached] Cached file state fixture
 * @property {String} [uncached] Uncached file state fixture
 */

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

  if (format === 'map') {
    return json8.parse(file, { map: true })
  }

  return file
}

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
 *   restored: '...',
 *   cached: '...',
 *   uncached: '...'
 * }
 * @param {String} path Path to fixtures folder from test fixtures folder root
 * @param {String} [format] Fixture format. If it is not passed – returns fixture as
 *  string in UTF8
 * @returns {Fixtures}
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
  fixture,
  fixtures,
  createFakeSpinner,
  createFakePrompt,
}

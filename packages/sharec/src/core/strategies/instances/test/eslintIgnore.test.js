const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { eslintIgnoreStrategy } = require('../eslintignore')

describe('strategy > eslintignore', () => {
  const eslintignoreCurrent = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/eslintignore/01-base/current.txt',
    ),
    'utf8',
  )
  const eslintignoreNew = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/eslintignore/01-base/new.txt',
    ),
    'utf8',
  )
  const eslintignoreResult = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/eslintignore/01-base/result.txt',
    ),
    'utf8',
  )
  const eslintignoreRestored = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/eslintignore/01-base/restored.txt',
    ),
    'utf8',
  )

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(
        eslintIgnoreStrategy.merge()(eslintignoreCurrent, eslintignoreNew),
      ).toEqual(eslintignoreResult)
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        eslintIgnoreStrategy.unapply()(eslintignoreResult, eslintignoreNew),
      ).toEqual(eslintignoreRestored)
    })
  })
})

const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { npmIgnoreStrategy } = require('../npmignore')

describe('strategy > npmignore', () => {
  const npmignoreCurrent = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/npmignore/01-base/current.txt',
    ),
    'utf8',
  )
  const npmignoreNew = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/npmignore/01-base/new.txt',
    ),
    'utf8',
  )
  const npmignoreResult = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/npmignore/01-base/result.txt',
    ),
    'utf8',
  )
  const npmignoreRestored = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/npmignore/01-base/restored.txt',
    ),
    'utf8',
  )

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(npmIgnoreStrategy.merge()(npmignoreCurrent, npmignoreNew)).toEqual(
        npmignoreResult,
      )
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        npmIgnoreStrategy.unapply()(npmignoreResult, npmignoreNew),
      ).toEqual(npmignoreRestored)
    })
  })
})

const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { gitIgnoreStrategy } = require('../gitignore')

describe('strategy > gitignore', () => {
  const gitignoreCurrent = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/gitignore/01-base/current.txt',
    ),
    'utf8',
  )
  const gitignoreNew = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/gitignore/01-base/new.txt',
    ),
    'utf8',
  )
  const gitignoreResult = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/gitignore/01-base/result.txt',
    ),
    'utf8',
  )
  const gitignoreRestored = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/gitignore/01-base/restored.txt',
    ),
    'utf8',
  )

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(gitIgnoreStrategy.merge()(gitignoreCurrent, gitignoreNew)).toEqual(
        gitignoreResult,
      )
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        gitIgnoreStrategy.unapply()(gitignoreResult, gitignoreNew),
      ).toEqual(gitignoreRestored)
    })
  })
})

const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > gitignore', () => {
  const gitignoreBaseFxt = fixtures('gitignore/lines/00-base')

  it('handles .gitignore files', () => {
    expect(pipe('.gitignore')(gitignoreBaseFxt)).toMatchSnapshot()
  })
})

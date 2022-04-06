const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > browserslist', () => {
  const browserslistBaseFxt = fixtures('browserslist/lines/00-base')

  it('should process browserslist configs', () => {
    expect(pipe('.browserslistrc')(browserslistBaseFxt)).toMatchSnapshot()
  })
})

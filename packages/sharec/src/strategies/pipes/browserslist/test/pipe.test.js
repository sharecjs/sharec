const { fixtures } = require('testUtils')
const browserslistPipe = require('../pipe')

describe('strategies > pipes > browserslist', () => {
  const browserslistBaseFxt = fixtures('atomic/browserslist/lines/00-base')

  it('should process browserslist configs', () => {
    expect(browserslistPipe('.browserslistrc')(browserslistBaseFxt)).toEqual(
      browserslistBaseFxt.result,
    )
  })
})

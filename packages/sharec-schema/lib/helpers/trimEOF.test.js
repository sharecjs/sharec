const { EOL } = require('os')
const trimEOF = require('./trimEOF')

describe('strategies > helpers > params > trimEOF', () => {
  it('should trim EOF each params entry', () => {
    expect(
      trimEOF({
        current: `foo${EOL}bar${EOL}baz${EOL}`,
        upcoming: `foo${EOL}bar${EOL}baz${EOL}`,
      }),
    ).toEqual({
      current: `foo${EOL}bar${EOL}baz`,
      upcoming: `foo${EOL}bar${EOL}baz`,
    })
  })
})

const { fixtures } = require('testUtils')
const listAtom = require('../list')

describe('atoms > list', () => {
  const listFxt = fixtures('list/json/00-base', 'json')

  it('should return current if upcoming is not passed', () => {
    const result = listAtom({ current: listFxt.current })

    expect(result).toEqual(listFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    const result = listAtom({ upcoming: listFxt.upcoming })

    expect(result).toEqual(listFxt.upcoming)
  })

  it('should merge lists with cache', () => {
    const result = listAtom({
      current: listFxt.current,
      upcoming: listFxt.upcoming,
      cached: listFxt.cached,
    })

    expect(result).toEqual(listFxt.result)
  })
})

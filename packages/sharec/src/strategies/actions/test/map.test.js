const map = require('../map')

describe('actions > map', () => {
  const mapper = map(
    ['filename', () => 'foo'],
    [/\.json$/, () => 'bar'],
    [/\.ya?ml$/, () => 'baz'],
  )

  it('should map functions by filename regexp and strings', () => {
    expect(mapper('filename')()).toEqual('foo')
    expect(mapper('filename.json')()).toEqual('bar')
    expect(mapper('filename.yaml')()).toEqual('baz')
    expect(mapper('filename.yml')()).toEqual('baz')
  })

  it('should returns null if any mapper is not matched', () => {
    expect(mapper('filename.toml')).toEqual(null)
  })
})

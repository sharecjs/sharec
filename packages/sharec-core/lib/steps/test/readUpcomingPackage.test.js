const { vol } = require('memfs')
const readUpcomingPackage = require('../readUpcomingPackage')

describe('steps > readUpcomingPackage', () => {
  const input = { configPath: '/configs' }

  beforeEach(() => {
    vol.reset()
  })

  it('should read package.json from upcoming config', async () => {
    const packageJson = {
      foo: 'bar',
      bar: 'baz',
      baz: 'foo',
    }
    const dir = {
      'package.json': JSON.stringify(packageJson),
    }

    vol.fromJSON(dir, input.configPath)

    const output = await readUpcomingPackage(input)

    expect(output).toEqual({
      ...input,
      upcomingPackage: packageJson,
    })
  })

  it('should throw an error if package.json is not exist in upcoming config', async (done) => {
    const dir = {}

    vol.fromJSON(dir, input.configPath)

    try {
      await readUpcomingPackage(input)
    } catch (err) {
      done()
    }
  })
})

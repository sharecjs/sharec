const { vol } = require('memfs')
const writeMeta = require('../writeMeta')

describe('steps > writeMeta', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should write upcoming package.json meta to target package.json', async () => {
    expect.assertions(2)

    const targetPackage = {}
    const upcomingPackage = {
      name: 'awesome-config',
      version: '0.0.0',
    }
    const input = {
      targetPath: '/target',
      upcomingPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    const output = await writeMeta(input)

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual({
      sharec: {
        config: upcomingPackage.name,
        version: upcomingPackage.version,
      },
    })
    expect(output).toEqual(input)
  })

  it('should not write upcoming package.json meta to target package.json if disappear option is given', async () => {
    expect.assertions(2)

    const targetPackage = {}
    const upcomingPackage = {
      name: 'awesome-config',
      version: '0.0.0',
    }
    const input = {
      targetPath: '/target',
      options: { disappear: true },
      upcomingPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    const output = await writeMeta(input)

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual({})
    expect(output).toEqual(input)
  })
})
